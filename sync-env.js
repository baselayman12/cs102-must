const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const targetPath = path.join(__dirname, 'env-config.js');

function syncEnv() {
    if (!fs.existsSync(envPath)) return;

    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split(/\r?\n/);
    const env = {};

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

    const clientEnv = {
        SUPABASE_URL: env.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || ''
    };

    fs.writeFileSync(targetPath, `window.__ENV__ = ${JSON.stringify(clientEnv, null, 4)};\n`, 'utf8');
}

syncEnv();

if (process.argv.includes('--watch')) {
    fs.watchFile(envPath, { interval: 1000 }, () => syncEnv());
}
