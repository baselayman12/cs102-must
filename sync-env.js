// ==========================================================================
// CS 102 MUST - Sync .env to env-config.js for Browser Runtime
// ==========================================================================
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const targetPath = path.join(__dirname, 'env-config.js');

function syncEnv() {
    if (!fs.existsSync(envPath)) {
        console.warn('[sync-env] .env file not found at:', envPath);
        return;
    }

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

    // Only expose frontend-safe variables to the browser
    const clientEnv = {
        SUPABASE_URL: env.SUPABASE_URL || '',
        SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || ''
    };

    const jsCode = `// Generated automatically from .env - DO NOT COMMIT\nwindow.__ENV__ = ${JSON.stringify(clientEnv, null, 4)};\n`;
    fs.writeFileSync(targetPath, jsCode, 'utf8');
    console.log('[sync-env] Successfully updated env-config.js with Supabase credentials.');
}

syncEnv();

// If run standalone with --watch, watch for .env file modifications
if (process.argv.includes('--watch')) {
    console.log('[sync-env] Watching .env for changes...');
    fs.watchFile(envPath, { interval: 1000 }, () => {
        console.log('[sync-env] .env changed, re-syncing...');
        syncEnv();
    });
}
