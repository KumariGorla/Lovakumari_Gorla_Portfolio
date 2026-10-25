// =====================================================
// PORTFOLIO JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
// PROJECT FILTERING
// =================================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter =
            button.getAttribute("data-filter");


        // Remove active state
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        // Add active state
        button.classList.add("active");


        // Filter projects
        projectCards.forEach((project) => {

            const categories =
                project.getAttribute("data-category");


            if (
                selectedFilter === "all" ||
                categories.includes(selectedFilter)
            ) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});

// ========================================
// DARK / LIGHT MODE
// ========================================

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.dataset.theme = "dark";
        themeToggle.textContent = "☀";
        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    } else {
        document.body.removeAttribute("data-theme");
        themeToggle.textContent = "☾";
        themeToggle.setAttribute("aria-pressed", "false");
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme !== "dark";
    const newTheme = isDark ? "dark" : "light";

    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
});



    // =================================================
    // MOBILE MENU
    // =================================================

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        // ---------------------------------------------
        // CLOSE MENU AFTER CLICKING A LINK
        // ---------------------------------------------

        const navigationLinks =
            document.querySelectorAll(".nav-links a");

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    // =================================================
    // ACTIVE NAVIGATION
    // =================================================

    const sections =
        document.querySelectorAll("section[id]");

    const navLinksForScroll =
        document.querySelectorAll(".nav-links a");


    function updateActiveLink() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinksForScroll.forEach((link) => {

            link.classList.remove("active");

            const targetSection =
                link.getAttribute("href")
                    .substring(1);

            if (
                targetSection === currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    // =================================================
    // SCROLL REVEAL
    // =================================================

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-text, " +
            ".highlight-card, " +
            ".skill-card, " +
            ".project-card, " +
            ".timeline-item, " +
            ".certification-card, " +
            ".education-card, " +
            ".contact-box"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

    // ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document
            .getElementById("contact-name")
            .value.trim();

        const email = document
            .getElementById("contact-email")
            .value.trim();

        const message = document
            .getElementById("contact-message")
            .value.trim();

        if (
            name.length < 2 ||
            email.length === 0 ||
            message.length < 10
        ) {
            formStatus.textContent =
                "Please check your details and try again.";
            return;
        }

        formStatus.textContent =
            "Validation successful! Message sending will be enabled when the backend is connected.";

    });

}
// ========================================
// BACK-TO-TOP BUTTON
// ========================================

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    function updateBackToTop() {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 400
        );
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
});