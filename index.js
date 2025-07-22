document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');

        // Burger Animation
        burger.classList.toggle('active');

        // Animate Links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToTestimonial(index));
        dots.appendChild(dot);
    });

    const allDots = document.querySelectorAll('.slider-dots span');
    allDots[0].classList.add('active');

    function updateTestimonial() {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[currentIndex].classList.add('active');

        allDots.forEach(dot => dot.classList.remove('active'));
        allDots[currentIndex].classList.add('active');
    }

    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonial();
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }

    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    slider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 1)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position considering fixed header height
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Form Validation (basic alerts)
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you'd send this data to a server
            alert('Your booking request has been received! We will contact you shortly.');
            this.reset();
        });
    }

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you'd send this data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Room Card Image Scaling (already handled by CSS :hover, but keeping JS for potential future complex animations)
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // This is already handled by CSS in :hover. If you want more complex JS animations, this is where they'd go.
            // card.querySelector('.room-image img').style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            // card.querySelector('.room-image img').style.transform = 'scale(1)';
        });
    });

    // Gallery Item Animations (already handled by CSS :hover)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // item.querySelector('img').style.transform = 'scale(1.1)';
            // item.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', () => {
            // item.querySelector('img').style.transform = 'scale(1)';
            // item.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
        });
    });

    // Scroll Reveal Animation (ensure ScrollReveal library is loaded in HTML <head>)
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true // Set to true if you want animations to re-trigger on scroll up
    });

    scrollReveal.reveal('.section-title, .section-subtitle', {
        origin: 'top',
        interval: 100
    });

    scrollReveal.reveal('.room-card, .facility-card, .gallery-item, .testimonial', {
        interval: 200
    });

    // Separate reveal for contact-info and contact-form for staggered effect
    scrollReveal.reveal('.contact-info', {
        origin: 'left',
        distance: '60px',
        delay: 200
    });
    scrollReveal.reveal('.contact-form', {
        origin: 'right',
        distance: '60px',
        delay: 400
    });
});