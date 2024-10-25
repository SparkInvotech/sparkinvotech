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

    // Create slide indicators
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => showSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Get all modal open buttons
    const openModalButtons = document.querySelectorAll('.open-modal');

    // Loop through each button and attach a click event
    openModalButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent page jump to the top
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "block"; // Open modal
            }
        });
    });

    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');

    // Loop through each close button and attach a click event
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = "none"; // Close modal
        });
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none"; // Close modal
        }
    });

    // Scroll with an offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const offset = 10; // Adjust this based on your navbar height

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    createIndicators();
    updateIndicators();
});
