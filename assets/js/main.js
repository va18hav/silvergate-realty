const header = document.querySelector('header');
const hero = document.querySelector('.hero');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const offset = window.scrollY * 0.25;
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
});

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => mobileNav.classList.remove('active'))
);

// Intersection Observer for reveal
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

// Testimonials carousel
const testimonials = [
    {
        quote: '“SilverGate secured our Malibu estate off-market within weeks. Precision, discretion, and artistry.”',
        author: '— Eleanor V., Greenwich Estate',
    },
    {
        quote: '“From private previews to flawless closing, their concierge team orchestrated every element to perfection.”',
        author: '— Marcus L., Pacific Palisades',
    },
    {
        quote: '“Their market intelligence and global reach connected us with a buyer others simply could not.”',
        author: '— Sofia & Nathan R., Upper East Side',
    },
];

let currentTestimonial = 0;
const quoteEl = document.getElementById('testimonialQuote');
const authorEl = document.getElementById('testimonialAuthor');

function updateTestimonial(index) {
    quoteEl.textContent = testimonials[index].quote;
    authorEl.textContent = testimonials[index].author;
}

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
});

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonial);
});

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
}, 7000);

// Contact form validation
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        feedback.textContent = 'Please complete all fields with valid information.';
        feedback.style.color = 'crimson';
        return;
    }

    const emailField = form.elements['email'];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value)) {
        feedback.textContent = 'Please provide a valid email address.';
        feedback.style.color = 'crimson';
        return;
    }

    feedback.textContent = 'Thank you. Our concierge will be in touch shortly.';
    feedback.style.color = 'green';
    form.reset();
});
