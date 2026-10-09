/**
 * Cloudflare Worker for Direct R2 File Uploads
 * Project: CS 102 MUST
 * 
 * Instructions:
 * 1. In Cloudflare Dashboard -> Workers & Pages -> Create Application -> Create Worker
 * 2. Name: cs102-upload-api
 * 3. Paste this code and click "Deploy"
 * 4. Go to Settings -> Bindings (or Variables) -> R2 Bucket Bindings:
 *    - Variable Name: BUCKET
 *    - R2 Bucket: cs102-mustbs
 * 5. Click "Save and Deploy"
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Health check endpoint
    if (request.method === 'GET') {
      const isBound = Boolean(env.BUCKET || env.MY_BUCKET);
      return new Response(JSON.stringify({
        status: 'online',
        message: 'CS 102 R2 Upload Worker is running',
        r2Bound: isBound,
        cdnDomain: 'https://cdn.cs102-must.sytharia.com'
      }, null, 2), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    // Handle File Upload
    if (request.method === 'POST') {
      try {
        const bucket = env.BUCKET || env.MY_BUCKET;
        if (!bucket) {
          return new Response(JSON.stringify({
            success: false,
            message: 'R2 Bucket is not bound to this worker. Please bind your bucket with variable name BUCKET.'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('multipart/form-data')) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Expected multipart/form-data request'
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
          return new Response(JSON.stringify({
            success: false,
            message: 'No file uploaded under key "file"'
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Clean original filename
        const originalName = file.name || 'document.pdf';
        const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const objectKey = `materials/${Date.now()}-${cleanName}`;

        // Stream file directly to Cloudflare R2
        await bucket.put(objectKey, file.stream(), {
          httpMetadata: {
            contentType: file.type || 'application/octet-stream',
          },
        });

        const cdnBase = (env.CDN_DOMAIN || 'https://cdn.cs102-must.sytharia.com').replace(/\/+$/, '');
        const publicUrl = `${cdnBase}/${objectKey}`;

        return new Response(JSON.stringify({
          success: true,
          url: publicUrl,
          key: objectKey,
          filename: originalName,
          size: file.size,
          mimetype: file.type
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Upload failed: ' + (err.message || String(err))
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders,
    });
  }
};
