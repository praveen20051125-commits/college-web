/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Smooth Custom Cursor
    const cursor = document.querySelector(".custom-cursor");
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Handle cursor scale variations on interactive element hovers
    const interactiveElements = document.querySelectorAll("a, button, .academic-card, .floating-card");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
    });

    // 2. Translucent Navigation Bar Blur Effect on Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Hero Interactive Cards: 3D Parallax Tilt Effect on Mouse Move
    const cards = document.querySelectorAll(".floating-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Calculate rotational intensity degrees
            const rotateX = -(y / rect.height) * 20; 
            const rotateY = (x / rect.width) * 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // 4. Academic Cards: Mouse Spotlight Glow Coordinates Tracking
    const academicCards = document.querySelectorAll(".academic-card");
    academicCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // 5. Scroll Reveals: Intersection Observer Pipeline
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // If it contains a numeric counter, kick off the step calculation function
                const counterElement = entry.target.querySelector(".counter");
                if (counterElement) {
                    runCounter(counterElement);
                }
                observer.unobserve(entry.target); // Kill tracking once fired
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => revealObserver.observe(element));

    // 6. Impact Metric Numerical Counters Progression Engine
    function runCounter(el) {
        const target = parseInt(el.getAttribute("data-target"));
        const duration = 2000; // Complete within 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let start = 0;
        
        // Calculate dynamic increments for high-order values
        const increment = target > 1000 ? Math.ceil(target / 100) : 1;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.innerText = target.toLocaleString() + "+";
                clearInterval(timer);
            } else {
                el.innerText = start.toLocaleString();
            }
        }, stepTime);
    }
});