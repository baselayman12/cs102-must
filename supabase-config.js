let supabaseClient = null;
window.supabaseClient = null;
window.__ENV__ = window.__ENV__ || {};

function parseEnvText(text) {
    const env = {};
    if (!text) return env;
    const lines = text.split(/\r?\n/);
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
    return env;
}

async function loadEnvConfig() {
    if (window.__ENV__ && window.__ENV__.SUPABASE_URL && window.__ENV__.SUPABASE_ANON_KEY) {
        return window.__ENV__;
    }

    const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
    if (isLocal) {
        try {
            let response = await fetch('.env');
            if (response.ok) {
                const parsed = parseEnvText(await response.text());
                window.__ENV__ = Object.assign({}, window.__ENV__, parsed);
                return window.__ENV__;
            }
        } catch (err) {}
    }

    if (!window.__ENV__ || !window.__ENV__.SUPABASE_URL) {
        window.__ENV__ = {
            SUPABASE_URL: "https://mzpuinxbuoeohcnozops.supabase.co",
            SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cHVpbnhidW9lb2hjbm96b3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0ODQ0MDQsImV4cCI6MjEwNzA2MDQwNH0.8SjIcC2puPlwB8VmpDMnDMHkzq9SGGCFPZxDjLFx2-M"
        };
    }

    return window.__ENV__;
}

window.supabaseReady = (async function initSupabase() {
    const env = await loadEnvConfig();
    const url = env.SUPABASE_URL;
    const anonKey = env.SUPABASE_ANON_KEY;

    if (url && anonKey && typeof supabase !== 'undefined') {
        try {
            supabaseClient = supabase.createClient(url, anonKey);
            window.supabaseClient = supabaseClient;
        } catch (err) {
            console.error('[Supabase Error]', err);
        }
    }

    return supabaseClient;
})();
