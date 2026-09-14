document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation for Cards
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        observer.observe(card);
    });

    // 2. Interactive 3D Card Hover Effect
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });

    // 3. Typing Effect for C++ Code Terminal (if present)
    const codeElement = document.querySelector(".code-box code, pre code");
    if (codeElement) {
        const fullText = codeElement.innerText;
        codeElement.innerText = "";
        let i = 0;
        
        function typeWriter() {
            if (i < fullText.length) {
                codeElement.innerText += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 15);
            }
        }
        
        // Trigger typing when section is visible
        const codeObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                codeObserver.disconnect();
            }
        }, { threshold: 0.5 });
        
        codeObserver.observe(codeElement);
    }
});

// 4. Live Search Filter for Lectures & Quizzes
function filterContent() {
    const input = document.getElementById("searchBar");
    if (!input) return;
    
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll(".cards-grid .card");

    cards.forEach(card => {
        const title = card.querySelector("h3") ? card.querySelector("h3").innerText.toLowerCase() : "";
        const desc = card.querySelector("p") ? card.querySelector("p").innerText.toLowerCase() : "";
        
        if (title.includes(filter) || desc.includes(filter)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
