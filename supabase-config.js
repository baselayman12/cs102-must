// ==========================================================================
// CS 102 MUST - Dynamic Supabase Client Configuration (.env Loader)
// ==========================================================================

// Global client reference
let supabaseClient = null;
window.supabaseClient = null;
window.__ENV__ = window.__ENV__ || {};

/**
 * Parses raw .env file text into key-value pairs
 * Handles quotes, comments, empty lines, and trailing spaces
 */
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
            // Strip surrounding double or single quotes
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            env[key] = val;
        }
    }
    return env;
}

/**
 * Loads environment variables by fetching the .env file from the local server
 */
async function loadEnvConfig() {
    // Return early if already loaded
    if (window.__ENV__ && window.__ENV__.SUPABASE_URL && window.__ENV__.SUPABASE_ANON_KEY) {
        return window.__ENV__;
    }

    try {
        // Try relative .env first, then root /.env
        let response = await fetch('.env');
        if (!response.ok) {
            response = await fetch('/.env');
        }

        if (response.ok) {
            const text = await response.text();
            const parsed = parseEnvText(text);
            window.__ENV__ = Object.assign({}, window.__ENV__, parsed);
            return window.__ENV__;
        }
    } catch (err) {
        if (window.location.protocol === 'file:') {
            console.warn('[Supabase] App is running via file:// protocol. Local browsers restrict reading files via fetch(). Run "npm run dev" to serve via HTTP.');
        } else {
            console.warn('[Supabase] Could not fetch .env file:', err);
        }
    }

    return window.__ENV__;
}

/**
 * Initializes Supabase Client dynamically from .env
 * Exposes window.supabaseReady promise so callers can await initialization
 */
window.supabaseReady = (async function initSupabase() {
    const env = await loadEnvConfig();

    const url = env.SUPABASE_URL;
    const anonKey = env.SUPABASE_ANON_KEY;

    const isPlaceholder = !url || !anonKey ||
        url.includes("YOUR_SUPABASE") ||
        url.includes("your-project-id") ||
        anonKey.includes("YOUR_SUPABASE") ||
        anonKey.includes("...");

    if (!isPlaceholder && typeof supabase !== 'undefined') {
        try {
            supabaseClient = supabase.createClient(url, anonKey);
            window.supabaseClient = supabaseClient;
            console.log('[Supabase] Initialized successfully from .env');
        } catch (err) {
            console.error('[Supabase] Initialization failed:', err);
        }
    } else {
        if (isPlaceholder) {
            console.warn('[Supabase] Missing or placeholder credentials in .env. Run "npm run dev" with valid SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.');
        }
    }

    return supabaseClient;
})();
