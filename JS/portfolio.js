const slides = document.querySelectorAll('.project-slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active', 'flip'));
    index = (n + slides.length) % slides.length;
    slides[index].classList.add('active');
}

if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', () => {
        showSlide(index + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(index - 1);
    });
}

const isMobile = window.innerWidth <= 768;

slides.forEach(slide => {
    if (isMobile) {
        slide.addEventListener('click', () => {
            slide.classList.toggle('flip');
        });
    } else {
        slide.addEventListener('mouseenter', () => {
            slide.classList.add('flip');
        });

        slide.addEventListener('mouseleave', () => {
            slide.classList.remove('flip');
        });
    }
});

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    if (!isMobile) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    }

    card.addEventListener('click', () => {
        card.classList.toggle('active-skill');

        if (card.classList.contains('active-skill')) {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const skillCardsFilter = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCardsFilter.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form && formMsg) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        formMsg.textContent = 'Message envoyé avec succès !';
        form.reset();

        setTimeout(() => {
            formMsg.textContent = '';
        }, 3000);
    });
}

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function closeMenu() {
    navMenu.classList.remove('active');
    burger.classList.remove('active');
    navOverlay.classList.remove('active');
    navbar.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
}

function openMenu() {
    navMenu.classList.add('active');
    burger.classList.add('active');
    navOverlay.classList.add('active');
    navbar.classList.add('menu-open');
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
}

if (burger && navMenu && navbar) {
    burger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navOverlay.addEventListener('click', closeMenu);

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const cursor = document.querySelector('.cursor');

if (cursor && !isMobile) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

if (cursor && isMobile) {
    cursor.style.display = 'none';
}
