document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicatorsContainer.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    nextSlide.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevSlide.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    document.querySelector('.slides').addEventListener('mouseover', () => {
        clearInterval(slideInterval);
    });

    document.querySelector('.slides').addEventListener('mouseout', () => {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact Form Submission with Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = contactForm.querySelector('input[name="email"]').value;
        if (validateEmail(email)) {
            showToast('Thank you for your message!');
            contactForm.reset();
        } else {
            showToast('Please enter a valid email address.');
        }
    });

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[name="email"]').value;
            if (validateEmail(email)) {
                showToast('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                showToast('Please enter a valid email address.');
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Toast Notification Function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /* Show Back to Top Button when scrolling */
    window.onscroll = function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

    // Create slide indicators
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => showSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    createIndicators();
    updateIndicators();
});
