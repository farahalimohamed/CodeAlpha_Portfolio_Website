// Portfolio data for carousel - Farah's Projects
const portfolioData = [
    {
        id: 1,
        title: 'Gaming Website',
        description: 'Interactive gaming website with modern UI, smooth animations, and responsive layouts for immersive gaming experience.',
        image: 'images/Gaming Project.png',
        tech: ['HTML', 'CSS', 'JavaScript'],
        website: 'https://farahalimohamed.github.io/Gaming-Website/',
        github: 'https://github.com/farahalimohamed/Gaming-Website'
    },
    {
        id: 2,
        title: 'Real-time Chat App',
        description: 'Real-time chat application using MERN stack with Socket.io for instant messaging and user authentication.',
        image: 'images/Chatty Project.png',
        tech: ['React', 'Node.js', 'Socket.io'],
        website: null,
        github: 'https://github.com/farahalimohamed/chatty-app'
    },
    {
        id: 3,
        title: 'FreshMarket E-commerce',
        description: 'E-commerce website for fresh products with intuitive UI, secure checkout, and efficient browsing experience.',
        image: 'images/Route Project.png',
        tech: ['React', 'Tailwind CSS', 'API'],
        website: 'https://ecommerce-react-app-git-main-farah-alis-projects.vercel.app/login',
        github: 'https://github.com/farahalimohamed/EcommerceReactApp'
    },
    {
        id: 4,
        title: 'GrocerEase Platform',
        description: 'Grocery management platform with mapping and payment integration for seamless shopping experience.',
        image: 'images/ITI project.png',
        tech: ['React', 'Maps API', 'Payment'],
        website: null,
        github: 'https://github.com/mohamed4mahmouud/GrocerEase'
    },
    {
        id: 5,
        title: 'Devfolio Portfolio',
        description: 'Clean portfolio to showcase skills and projects with smooth navigation and professional design.',
        image: 'images/Devfolio Project.png',
        tech: ['HTML', 'CSS', 'JavaScript'],
        website: 'https://farahalimohamed.github.io/DevFolio/',
        github: 'https://github.com/farahalimohamed/DevFolio.git'
    }
];

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    // Create buttons based on availability
    let buttons = '';
    if (data.website) {
        buttons += `<button class="card-cta" onclick="window.open('${data.website}', '_blank')" title="View Live Website">
            <i class='bx bx-link-external'></i> Website
        </button>`;
    }
    if (data.github) {
        buttons += `<button class="card-cta github-btn" onclick="window.open('${data.github}', '_blank')" title="View Source Code">
            <i class='bx bxl-github'></i> GitHub
        </button>`;
    }

    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image">
                <img src="${data.image}" alt="${data.title}" loading="lazy">
            </div>
            <h3 class="project-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <div class="card-buttons">
                ${buttons}
            </div>
        </div>
    `;

    return item;
}

function initCarousel() {
    // Create carousel items
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        // Calculate relative position
        let offset = index - currentIndex;

        // Wrap around for continuous rotation
        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        // Reset transform
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        // Adjust spacing based on screen size
        let spacing1 = 350;
        let spacing2 = 550;
        let spacing3 = 700;

        if (isMobile) {
            spacing1 = 230;
            spacing2 = 360;
            spacing3 = 480;
        } else if (isTablet) {
            spacing1 = 290;
            spacing2 = 450;
            spacing3 = 600;
        }

        if (absOffset === 0) {
            // Center item
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            // Side items
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.85 : 0.8;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-150px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            // Further side items
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.7 : 0.65;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-250px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            // Even further items
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.6 : 0.55;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            // Hidden items (behind)
            item.style.transform = 'translate(-50%, -50%) translateZ(-450px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Auto-rotate carousel
let autoRotate = setInterval(nextSlide, 5000);

// Pause auto-rotate on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
});

carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initCarousel);

document.addEventListener('DOMContentLoaded', function () {
    function isDesktop() {
        return window.innerWidth > 1024;
    }

    function isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    const contactBtn = document.querySelector('.contact-btn.desktop-only');
    const contactBtnMobile = document.querySelector('.contact-btn.mobile-only');

    if (contactBtn) {
        if (isDesktop() || isTablet()) {
            contactBtn.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        } else {
            contactBtn.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto' 
                    });
                    e.preventDefault();
                }
            });
        }
    }

    function updateContactButtons() {
        if (isDesktop() || isTablet()) {
            if (contactBtn) contactBtn.style.display = 'block';
            if (contactBtnMobile) contactBtnMobile.style.display = 'none';
        } else {
            if (contactBtn) contactBtn.style.display = 'none';
            if (contactBtnMobile) contactBtnMobile.style.display = 'block';
        }
    }

    updateContactButtons();
    window.addEventListener('resize', updateContactButtons);

    if (isDesktop() || isTablet()) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#' || href === '#!') return;

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();

                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    const navMenu = document.querySelector('.nav-menu');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (menuToggle) menuToggle.classList.remove('active');
                    }
                }
            });
        });
    }
});