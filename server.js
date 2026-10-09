const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

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

try {
    const targetPath = path.join(__dirname, 'env-config.js');
    const clientEnv = {
        SUPABASE_URL: env.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || ''
    };
    fs.writeFileSync(targetPath, `window.__ENV__ = ${JSON.stringify(clientEnv, null, 4)};\n`, 'utf8');
} catch (e) {}

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
}

const app = express();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Always serve fresh env-config.js dynamically
app.get('/env-config.js', (req, res) => {
    const currentEnv = loadEnv();
    const clientEnv = {
        SUPABASE_URL: currentEnv.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: currentEnv.SUPABASE_ANON_KEY || ''
    };
    res.type('application/javascript').send(`window.__ENV__ = ${JSON.stringify(clientEnv, null, 4)};\n`);
});

app.get('/api/r2-status', async (req, res) => {
    if (!isR2Configured || !r2Client) {
        return res.json({ configured: false, message: 'Cloudflare R2 is not configured' });
    }
    try {
        await r2Client.send(new ListObjectsV2Command({ Bucket: env.R2_BUCKET_NAME, MaxKeys: 1 }));
        res.json({ configured: true, bucket: env.R2_BUCKET_NAME, publicUrl: env.R2_PUBLIC_URL || '' });
    } catch (err) {
        res.status(500).json({ configured: false, error: err.message });
    }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!isR2Configured || !r2Client) {
        return res.status(400).json({ success: false, message: 'Cloudflare R2 is not configured' });
    }

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file provided' });
    }

    try {
        const file = req.file;
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const objectKey = `materials/${Date.now()}-${cleanName}`;

        await r2Client.send(new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: objectKey,
            Body: file.buffer,
            ContentType: file.mimetype || 'application/octet-stream'
        }));

        const basePublicUrl = (env.R2_PUBLIC_URL || `https://${env.R2_BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`).replace(/\/+$/, '');
        const filePublicUrl = `${basePublicUrl}/${objectKey}`;

        res.json({
            success: true,
            url: filePublicUrl,
            key: objectKey,
            filename: originalName,
            size: file.size,
            mimetype: file.mimetype
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Serve downloadable files with forced attachment header
app.use('/files', express.static(path.join(__dirname, 'files'), {
    setHeaders: (res, filePath) => {
        const filename = path.basename(filePath);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }
}));

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`CS 102 Server running: http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        const fallbackPort = 3005;
        app.listen(fallbackPort, () => {
            console.log(`CS 102 Server running: http://localhost:${fallbackPort}`);
        });
    }
});
