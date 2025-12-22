// Mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggle = document.querySelector('.has-dropdown .nav-link');
const dropdown = document.querySelector('.dropdown');

// Toggle mobile menu
menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
});

// Toggle dropdown on mobile
if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            dropdown.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Close dropdown if open
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});



// Add focus to main content when skip link is clicked
const skipLink = document.querySelector('.skip-link');
const mainContent = document.querySelector('main');

skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    
    // Remove tabindex after focus to avoid tab stops
    setTimeout(() => {
        mainContent.removeAttribute('tabindex');
    }, 1000);
});

// Detect mouse vs keyboard users for focus styling
document.addEventListener('mousedown', function() {
    document.body.classList.add('mouse-user');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.remove('mouse-user');
    }
});

// Update current page indicator based on URL hash
function updateCurrentPageIndicator() {
    const currentPage = window.location.hash || '#home';
    const currentLink = document.querySelector(`.nav-link[href="${currentPage}"]`);
    
    if (currentLink) {
        // Remove current class from all links
        document.querySelectorAll('.nav-link.current').forEach(link => {
            link.classList.remove('current');
            link.removeAttribute('aria-current');
        });
        
        // Add current class to active link
        currentLink.classList.add('current');
        currentLink.setAttribute('aria-current', 'page');
    }
}

// Update on page load and hash change
window.addEventListener('load', updateCurrentPageIndicator);
window.addEventListener('hashchange', updateCurrentPageIndicator);

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) {
        const isClickInsideDropdown = dropdown && dropdown.contains(e.target);
        const isClickOnDropdownToggle = dropdownToggle && dropdownToggle.contains(e.target);
        
        if (!isClickInsideDropdown && !isClickOnDropdownToggle && dropdown && dropdown.style.opacity === '1') {
            // Reset dropdown state
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            });
            
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// Handle dropdown keyboard navigation for desktop
if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('keydown', function(e) {
        if (window.innerWidth > 768 && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
                // Focus first dropdown item
                const firstDropdownItem = dropdown.querySelector('.dropdown-item');
                if (firstDropdownItem) firstDropdownItem.focus();
            } else {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        }
    });
}

