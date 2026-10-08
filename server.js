// ==========================================================================
// CS 102 MUST - Dev Server with Cloudflare R2 Upload API
// ==========================================================================
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// 1. Load .env Configuration
const envPath = path.join(__dirname, '.env');
function loadEnv() {
    const env = {};
    if (fs.existsSync(envPath)) {
        const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx !== -1) {
                const key = trimmed.slice(0, eqIdx).trim();
                let val = trimmed.slice(eqIdx + 1).trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                env[key] = val;
            }
        }
    }
    return env;
}

const env = loadEnv();

// 2. Sync client-safe variables to env-config.js
try {
    const targetPath = path.join(__dirname, 'env-config.js');
    const clientEnv = {
        SUPABASE_URL: env.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || ''
    };
    const jsCode = `// Generated automatically from .env - DO NOT COMMIT\nwindow.__ENV__ = ${JSON.stringify(clientEnv, null, 4)};\n`;
    fs.writeFileSync(targetPath, jsCode, 'utf8');
} catch (e) {
    console.warn('[Server] Could not sync env-config.js:', e.message);
}

// 3. Initialize Cloudflare R2 Client
let r2Client = null;
const isR2Configured = Boolean(
    env.R2_ACCOUNT_ID &&
    env.R2_ACCESS_KEY_ID &&
    env.R2_SECRET_ACCESS_KEY &&
    env.R2_BUCKET_NAME &&
    !env.R2_ACCOUNT_ID.includes('your_')
);

if (isR2Configured) {
    r2Client = new S3Client({
        region: 'auto',
        endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.R2_ACCESS_KEY_ID,
            secretAccessKey: env.R2_SECRET_ACCESS_KEY
        }
    });
    console.log(`[Cloudflare R2] Configured for bucket: "${env.R2_BUCKET_NAME}"`);
} else {
    console.warn('[Cloudflare R2] Credentials not configured yet in .env');
}

// 4. Initialize Express App
const app = express();

// Multer memory storage (files up to 100MB)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }
});

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Health / Status Check Endpoint
app.get('/api/r2-status', async (req, res) => {
    if (!isR2Configured || !r2Client) {
        return res.json({ configured: false, message: 'Cloudflare R2 is not configured in .env' });
    }

    try {
        await r2Client.send(new ListObjectsV2Command({ Bucket: env.R2_BUCKET_NAME, MaxKeys: 1 }));
        res.json({
            configured: true,
            bucket: env.R2_BUCKET_NAME,
            publicUrl: env.R2_PUBLIC_URL || ''
        });
    } catch (err) {
        res.status(500).json({ configured: false, error: err.message });
    }
});

// File Upload Endpoint: POST /api/upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!isR2Configured || !r2Client) {
        return res.status(400).json({
            success: false,
            message: 'Cloudflare R2 credentials are not configured in .env'
        });
    }

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file provided in the request'
        });
    }

    try {
        const file = req.file;
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8'); // UTF-8 safe name
        const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const timestamp = Date.now();
        const objectKey = `materials/${timestamp}-${cleanName}`;

        const uploadCommand = new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: objectKey,
            Body: file.buffer,
            ContentType: file.mimetype || 'application/octet-stream'
        });

        await r2Client.send(uploadCommand);

        // Construct public URL
        const basePublicUrl = (env.R2_PUBLIC_URL || `https://${env.R2_BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`).replace(/\/+$/, '');
        const filePublicUrl = `${basePublicUrl}/${objectKey}`;

        console.log(`[Upload Success] File "${originalName}" uploaded to R2 -> ${filePublicUrl}`);

        res.json({
            success: true,
            url: filePublicUrl,
            key: objectKey,
            filename: originalName,
            size: file.size,
            mimetype: file.mimetype
        });

    } catch (err) {
        console.error('[Upload Error]', err);
        res.status(500).json({
            success: false,
            message: 'Failed to upload to Cloudflare R2: ' + err.message
        });
    }
});

// Serve static repository files
app.use(express.static(__dirname));

// Start Listening
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`  CS 102 MUST Dev Server running at: http://localhost:${PORT}`);
    console.log(`  Dashboard: http://localhost:${PORT}/dev.html`);
    console.log(`  Cloudflare R2 CDN: ${env.R2_PUBLIC_URL || 'Not specified'}`);
    console.log(`==================================================\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        const fallbackPort = 3005;
        console.warn(`[Server] Port ${PORT} is busy, starting on fallback port ${fallbackPort}...`);
        app.listen(fallbackPort, () => {
            console.log(`[Server] Dev server running at: http://localhost:${fallbackPort}`);
        });
    } else {
        console.error('[Server Error]', err);
    }
});
