document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LIGHTBOX PREVIEW & GALLERY NAVIGATION
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close-lightbox");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const photoCards = Array.from(document.querySelectorAll(".photo-card"));

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const card = photoCards[currentIndex];
        const imgSrc = card.querySelector("img").src;
        const title = card.querySelector("h3").innerText;
        const tag = card.querySelector(".tag").innerText;

        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<span style="color: var(--neon-yellow)">[${tag}]</span> ${title} <br><small style="color: var(--text-dim); font-size: 0.8rem;">NODE ${currentIndex + 1} OF ${photoCards.length}</small>`;
        lightbox.style.display = "flex";
    }

    function showNext() {
        let nextIndex = (currentIndex + 1) % photoCards.length;
        while (photoCards[nextIndex].style.display === "none") {
            nextIndex = (nextIndex + 1) % photoCards.length;
        }
        openLightbox(nextIndex);
    }

    function showPrev() {
        let prevIndex = (currentIndex - 1 + photoCards.length) % photoCards.length;
        while (photoCards[prevIndex].style.display === "none") {
            prevIndex = (prevIndex - 1 + photoCards.length) % photoCards.length;
        }
        openLightbox(prevIndex);
    }

    photoCards.forEach((card, idx) => {
        card.addEventListener("click", () => openLightbox(idx));
    });

    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });

    // Keyboard Navigation (Arrow Keys & ESC)
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });

    // ==========================================
    // 2. CATEGORY FILTER & DYNAMIC COUNTER
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterContainer = document.querySelector(".filter-container");

    const counterBadge = document.createElement("div");
    counterBadge.className = "cyber-counter";
    counterBadge.style.cssText = "color: var(--neon-cyan); font-family: var(--font-heading); font-size: 0.85rem; margin-top: 0.5rem; text-align: center; width: 100%;";
    filterContainer.appendChild(counterBadge);

    function updateCounter(count) {
        counterBadge.innerHTML = `DISPLAYING <span style="color: var(--neon-magenta)">${count}</span> / ${photoCards.length} MEMORY NODES`;
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            let visibleCount = 0;

            photoCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            updateCounter(visibleCount);
        });
    });

    updateCounter(photoCards.length);

    // ==========================================
    // 3. CONTACT FORM INTERACTIVE CONTROLLER
    // ==========================================
    const commForm = document.getElementById("comm-form");
    const formStatus = document.getElementById("form-status");

    if (commForm) {
        commForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("sender-name").value.trim();
            const submitBtn = commForm.querySelector(".cyber-btn");

            submitBtn.disabled = true;
            submitBtn.innerText = "ENCRYPTING...";
            formStatus.style.color = "var(--neon-yellow)";
            formStatus.innerText = ">> ENCRYPTING PACKETS & INITIALIZING ROUTE...";

            setTimeout(() => {
                formStatus.style.color = "var(--neon-cyan)";
                formStatus.innerText = `>> SUCCESS: Signal transmitted from [${name.toUpperCase()}]. Confirmation logged.`;
                
                submitBtn.innerText = "TRANSMITTED!";
                submitBtn.style.background = "var(--neon-cyan)";
                submitBtn.style.color = "#000";

                commForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "TRANSMIT_DATA";
                    submitBtn.style.background = "";
                    submitBtn.style.color = "";
                    formStatus.innerText = "";
                }, 3500);
            }, 1200);
        });
    }

    // ==========================================
    // 4. NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("header, section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 5. INTERSECTION OBSERVER SCROLL ANIMATIONS
    // ==========================================
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
});