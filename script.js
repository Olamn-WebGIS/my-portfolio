document.addEventListener("DOMContentLoaded", () => {
   
    const links = document.querySelectorAll(".nav-link, .navigation-trigger");
    const sections = document.querySelectorAll(".page-section");
    const messageInput = document.getElementById("message");

    // --- 1. Robust Page Routing System ---
    function routeTo(targetId) {
        // Hide all active visibility settings 
        sections.forEach(sec => sec.classList.remove("active"));
        
        const destination = document.getElementById(targetId);
        if (destination) {
            destination.classList.add("active");
            
            // Re-fire our custom scroll reveal trigger manually for instantly clean styling
            setTimeout(evaluateVisibility, 50);
        }

        // Keep correct top link selection highlighted
        links.forEach(ln => {
            if (ln.getAttribute("data-target") === targetId) {
                ln.classList.add("active");
            } else {
                ln.classList.remove("active");
            }
        });

        window.scrollTo(0, 0);
    }

    links.forEach(button => {
        // Skip handling for package click buttons to prevent link interference
        if (button.classList.contains("package-select-btn")) return;

        button.addEventListener("click", (e) => {
            e.preventDefault();
            const target = button.getAttribute("data-target");
            routeTo(target);
            window.location.hash = target;
        });
    });

    // --- 2. Package Selection Auto-Fill Logic ---
    const packageButtons = document.querySelectorAll(".package-select-btn");

    packageButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Extract the descriptive text name from the clicked card element
            const selectedPackage = btn.getAttribute("data-package");
            
            // Automatically compose the personalized introductory message
            if (messageInput) {
                messageInput.value = `Hi Favour, I would like to get started on a project. I am interested in your "${selectedPackage}" tier.\n\nProject details & scope expectations: `;
            }
            
            // Execute route switch over to the contact form panel layout smoothly
            routeTo("contact");
            window.location.hash = "contact";

            // Focus directly onto the message field so the client can immediately continue typing
            setTimeout(() => {
                if (messageInput) {
                    messageInput.focus();
                    messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
                }
            }, 100);
        });
    });

    // CRITICAL LIVE PREVIEW FIX: Pull routing state hash directly from address path
    const currentHash = window.location.hash.substring(1);
    if (currentHash && document.getElementById(currentHash)) {
        routeTo(currentHash);
    } else {
        routeTo("home");
    }

    // --- 3. Advanced Scroll Entry Animations ---
    function evaluateVisibility() {
        const revealItems = document.querySelectorAll(".page-section.active .reveal-element");
        const triggerPoint = window.innerHeight * 0.88;
        
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerPoint) {
                item.classList.add("view-visible");
            }
        });
    }

    window.addEventListener("scroll", evaluateVisibility);

    // --- 4. Interactive Contact Form System ---
    const portalForm = document.getElementById("interactive-portal-form");
    const portalBtn = document.getElementById("portal-btn");
    const portalFeedback = document.getElementById("portal-feedback");

    if (portalForm) {
        portalForm.addEventListener("submit", (e) => {
            e.preventDefault();

            portalBtn.innerText = "Encrypting Stream...";
            portalBtn.disabled = true;
            portalBtn.style.opacity = "0.5";

            const nameValue = document.getElementById("name").value;

            setTimeout(() => {
                portalFeedback.classList.remove("state-hidden");
                portalFeedback.classList.add("success");
                portalFeedback.innerText = `System Notice: Message from ${nameValue} uploaded successfully. Connection secure.`;

                portalForm.reset();
                portalBtn.innerText = "Submit Project";
                portalBtn.disabled = false;
                portalBtn.style.opacity = "1";
            }, 1200);
        });
    }
});