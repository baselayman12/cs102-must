/* الألوان والخطوط الأساسية لـ MUST */
:root {
    --must-blue: #002b66;
    --must-green: #00a859;
    --must-accent: #2563eb;
    --bg-dark: #070a12;
    --card-bg: rgba(21, 29, 42, 0.6);
    --card-border: rgba(255, 255, 255, 0.08);
    --text-main: #f8fafc;
    --text-sub: #9ca3af;
    --font-family: 'Cairo', sans-serif;
}

/* تهيئة الصفحة */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: var(--font-family);
    line-height: 1.6;
    overflow-x: hidden;
    /* خلفية متدرجة خفيفة */
    background-image: 
        radial-gradient(at 10% 10%, rgba(0, 43, 102, 0.2) 0px, transparent 50%),
        radial-gradient(at 90% 90%, rgba(0, 168, 89, 0.1) 0px, transparent 50%);
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* --- الهيدر الزجاجي الرهيب (Glassmorphism) --- */
.navbar {
    background: rgba(7, 10, 18, 0.8);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--card-border);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 12px 0;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 15px;
}

.university-logo {
    height: 50px;
    width: auto;
    filter: drop-shadow(0 0 10px rgba(0, 168, 89, 0.3));
}

.brand-divider {
    width: 2px;
    height: 35px;
    background: linear-gradient(180deg, var(--must-blue), var(--must-green));
}

.cs-badge .cs-code {
    font-weight: 900;
    font-size: 1.2rem;
    background: linear-gradient(90deg, #60a5fa, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cs-badge .cs-title {
    font-size: 0.75rem;
    color: var(--text-sub);
    font-weight: 600;
}

.nav-links {
    display: flex;
    gap: 10px;
}

.nav-links a {
    color: var(--text-sub);
    text-decoration: none;
    font-weight: 700;
    padding: 10px 18px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.nav-links a:hover, .nav-links a.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
}

/* --- قسم الـ Hero والأنيميشن الترحيبي --- */
.hero-section {
    padding: 120px 0 80px;
    text-align: center;
    position: relative;
}

.hero-badge-tag {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(0, 168, 89, 0.15);
    color: var(--must-green);
    border: 1px solid var(--must-green);
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 25px;
    animation: fadeInUp 0.8s ease backwards;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 20px;
    animation: fadeInUp 1s ease 0.2s backwards;
}

.hero-title span {
    background: linear-gradient(135deg, #3b82f6, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
}

.hero-desc {
    color: var(--text-sub);
    font-size: 1.2rem;
    max-width: 750px;
    margin: 0 auto 40px;
    animation: fadeInUp 1s ease 0.4s backwards;
}

.hero-btns {
    display: flex;
    justify-content: center;
    gap: 20px;
    animation: fadeInUp 1s ease 0.6s backwards;
}

/* --- الزراير الشيك --- */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    cursor: pointer;
}

.btn-glow {
    background: linear-gradient(135deg, var(--must-blue), #2563eb);
    color: #fff;
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
}

.btn-glow:hover {
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.7);
    transform: translateY(-3px);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-main);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
}

.btn-outline {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text-sub);
    width: 100%;
    margin-top: auto;
}

.btn-outline:hover {
    border-color: var(--must-green);
    color: var(--must-green);
    background: rgba(0, 168, 89, 0.05);
}

/* --- الكروت الزجاجية (Glass Cards) بالأنيميشن --- */
section { padding: 80px 0; }

.section-title {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 50px;
    font-weight: 800;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
}

.glass-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 40px;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
}

.glass-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-icon {
    font-size: 2.5rem;
    color: var(--must-accent);
    margin-bottom: 20px;
}

.glass-card h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    font-weight: 700;
}

.glass-card p {
    color: var(--text-sub);
    font-size: 1rem;
    margin-bottom: 30px;
    flex-grow: 1;
}

/* --- الترمينال الحركي (typing box) --- */
.terminal-box {
    background: #030712;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    overflow: hidden;
    direction: ltr;
    max-width: 700px;
    margin: 0 auto;
}

.terminal-header {
    background: #111827;
    padding: 10px 15px;
    border-bottom: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #10b981; }

.file-name {
    color: var(--text-sub);
    font-family: monospace;
    font-size: 0.85rem;
    margin-left: 10px;
}

.terminal-box pre {
    padding: 25px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 1rem;
    color: #e2e8f0;
}

.keyword { color: #f43f5e; }
.string { color: #10b981; }
.func { color: #60a5fa; }
.type { color: #a78bfa; }
.comment { color: #6b7280; }

/* --- الفوتر --- */
footer {
    border-top: 1px solid var(--card-border);
    padding: 40px 0;
    text-align: center;
    background: #030712;
}

footer p { color: var(--text-sub); margin-bottom: 15px; }

.footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.footer-links a {
    color: var(--text-sub);
    text-decoration: none;
    font-size: 0.9rem;
    transition: 0.3s;
}

.footer-links a:hover {
    color: var(--must-green);
}

/* --- الأنيميشن --- */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title { font-size: 2.2rem; }
    .nav-links { display: none; }
}
