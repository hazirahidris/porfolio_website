document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        menuIconOpen.classList.toggle('hidden');
        menuIconClose.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        });
    });

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-link:not(.mobile-nav-link)');

    const onScroll = () => {
        let currentSection = 'home'; // Default to home

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to trigger highlighting a bit earlier
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        desktopNavLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('nav-link-active');
            }
        });

        // Special case for home, as it might not be a 'section' or to ensure it's active at top
        if (window.pageYOffset < window.innerHeight / 2) {
             desktopNavLinks.forEach(link => {
                link.classList.remove('nav-link-active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('nav-link-active');
                }
            });
        }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Run on load

    // Tabs for Experience Section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
            });
            
            // Activate clicked button
            button.classList.add('tab-active');
            
            // Hide all content
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show target content
            const targetContent = document.getElementById(`tab-content-${tabName}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });

    // Set default active tab (Work)
    const defaultTab = document.querySelector('.tab-btn[data-tab="work"]');
    if (defaultTab) {
        defaultTab.classList.add('tab-active');
    }
    const defaultContent = document.getElementById('tab-content-work');
    if (defaultContent) {
        defaultContent.classList.remove('hidden');
    }
});