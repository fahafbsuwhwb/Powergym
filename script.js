// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"], .hero-content a[href^="#"], .price-card a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in sections on scroll
const sections = document.querySelectorAll('.content-section');
const observerOptions = {
    root: null, // relative to document viewport 
    rootMargin: '0px',
    threshold: 0.15 // 15% of item is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Optional: unobserve after animation if you want it to animate only once
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section) {
        observer.observe(section);
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked (for SPA-like navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

// Add active class to nav link on scroll (optional, can be more complex for accuracy)
const navLi = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

// Simple Parallax for Hero Background (Optional)
// This is a very basic parallax, more advanced libraries can be used for smoother effects
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        let offset = window.pageYOffset;
        // Apply to background-position-y. Ensure hero has a background image set in CSS.
        // The '0.5' factor controls the speed of the parallax effect.
        heroSection.style.backgroundPositionY = offset * 0.4 + 'px'; 
    }
});

// Console log to confirm script is loaded
console.log("Power Gym script loaded successfully!");
