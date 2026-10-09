/* ==========================================================================
   CS 102 - MUST IT Educational Portal Scripts
   Responsive Menu, Live Search, Safe Interactions & Accessibility
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Hamburger Menu Toggle
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.setAttribute("aria-label", "فتح القائمة");

        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle("active");
            mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            
            // Switch icon between bars and times (close)
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        };

        const closeMenu = () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        };

        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking any nav link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on ESC key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Smooth Scroll Entrance for Cards (Progressive Enhancement)
    // ----------------------------------------------------------------------
    const cards = document.querySelectorAll(".card, .glass-card, .concept-card");
    if ("IntersectionObserver" in window && cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        cards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = `opacity 0.5s ease ${Math.min(index * 0.08, 0.4)}s, transform 0.5s ease ${Math.min(index * 0.08, 0.4)}s`;
            observer.observe(card);
        });
    }

    // ----------------------------------------------------------------------
    // 3. Subtle 3D Card Tilt (Only on Desktop with Fine Pointers)
    // ----------------------------------------------------------------------
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isFinePointer) {
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5; // Gentle 5deg max
                const rotateY = ((centerX - x) / centerX) * -5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. Live Search Filter for Lectures, Sections & Content
    // ----------------------------------------------------------------------
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", filterContent);
    }

    // ----------------------------------------------------------------------
    // 5. Code Copy Button for Terminal & Code Blocks
    // ----------------------------------------------------------------------
    const codeBlocks = document.querySelectorAll(".terminal-box pre, .code-block");
    codeBlocks.forEach(block => {
        const parent = block.parentElement;
        if (!parent) return;

        // Create copy button if not already present
        if (!parent.querySelector(".copy-code-btn")) {
            const copyBtn = document.createElement("button");
            copyBtn.className = "copy-code-btn";
            copyBtn.innerHTML = '<i class="far fa-copy"></i> <span>نسخ</span>';
            copyBtn.setAttribute("title", "نسخ الكود");
            copyBtn.setAttribute("aria-label", "نسخ الكود البرمجي");

            copyBtn.addEventListener("click", async () => {
                const codeToCopy = block.innerText.trim();
                try {
                    await navigator.clipboard.writeText(codeToCopy);
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>تم النسخ!</span>';
                    copyBtn.classList.add("copied");
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="far fa-copy"></i> <span>نسخ</span>';
                        copyBtn.classList.remove("copied");
                    }, 2000);
                } catch (err) {
                    console.error("Failed to copy code: ", err);
                }
            });

            // If terminal-box, insert into header, otherwise append to container
            const terminalHeader = parent.querySelector(".terminal-header");
            if (terminalHeader) {
                copyBtn.style.position = "static";
                copyBtn.style.marginRight = "auto";
                terminalHeader.appendChild(copyBtn);
            } else {
                parent.style.position = "relative";
                parent.appendChild(copyBtn);
            }
        }
    });
});

// --------------------------------------------------------------------------
// Global Content Search Function
// --------------------------------------------------------------------------
function filterContent() {
    const input = document.getElementById("searchBar");
    if (!input) return;
    
    const filter = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".cards-grid .card, .cards-grid .glass-card");
    const container = document.querySelector(".cards-grid");
    
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector("h3") ? card.querySelector("h3").innerText.toLowerCase() : "";
        const desc = card.querySelector("p") ? card.querySelector("p").innerText.toLowerCase() : "";
        const fullContent = card.innerText.toLowerCase();
        
        if (!filter || title.includes(filter) || desc.includes(filter) || fullContent.includes(filter)) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Handle "No Results" message
    let noResultsMsg = document.getElementById("no-results-msg");
    if (visibleCount === 0 && filter !== "") {
        if (!noResultsMsg && container) {
            noResultsMsg = document.createElement("div");
            noResultsMsg.id = "no-results-msg";
            noResultsMsg.style.gridColumn = "1 / -1";
            noResultsMsg.style.textAlign = "center";
            noResultsMsg.style.padding = "40px 20px";
            noResultsMsg.style.color = "var(--text-sub)";
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 2.5rem; opacity: 0.4; margin-bottom: 12px; display: block;"></i>
                <h3 style="color: #fff; margin-bottom: 6px;">لا توجد نتائج مطابقة</h3>
                <p>جرّب البحث بكلمة أخرى مثل: Lecture أو سكشن أو Arrays</p>
            `;
            container.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// --------------------------------------------------------------------------
// Universal Forced File Downloader (Bypasses Browser In-line Viewer)
// --------------------------------------------------------------------------
async function forceDownloadFile(url, filename, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const btn = event ? event.currentTarget : null;
    const originalHtml = btn ? btn.innerHTML : '';

    if (btn) {
        btn.style.pointerEvents = 'none';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري بدء التحميل...</span>';
    }

    const fallbackToProxy = () => {
        const cleanName = filename || url.split('/').pop().split('?')[0] || 'document.pdf';
        const workerUrl = `https://cs102-compiler-api.hhvgg2631.workers.dev/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(cleanName)}`;
        const tempLink = document.createElement('a');
        tempLink.href = workerUrl;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        setTimeout(() => document.body.removeChild(tempLink), 300);
    };

    try {
        // Step 1: Attempt direct blob fetch (works for same-origin and CORS assets)
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) throw new Error('Status: ' + res.status);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobUrl;
        tempLink.download = filename || url.split('/').pop().split('?')[0] || 'document.pdf';
        document.body.appendChild(tempLink);
        tempLink.click();

        setTimeout(() => {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobUrl);
        }, 500);
    } catch (err) {
        // Step 2: Fallback to Cloudflare Worker attachment proxy
        fallbackToProxy();
    } finally {
        if (btn) {
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.style.pointerEvents = '';
            }, 800);
        }
    }
}
window.forceDownloadFile = forceDownloadFile;

// Intercept all download links globally across the website
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[download]');
    if (link && link.hasAttribute('href')) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('blob:') && !href.startsWith('data:') && !href.startsWith('#')) {
            const rawName = link.getAttribute('download') || href.split('/').pop().split('?')[0] || 'download.pdf';
            forceDownloadFile(href, rawName, e);
        }
    }
});
