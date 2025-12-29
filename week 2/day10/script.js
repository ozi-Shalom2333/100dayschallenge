const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const responsiveIndicator = document.getElementById('viewType');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
        }
    });
});

const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

function updateResponsiveIndicator() {
    const width = window.innerWidth;
    
    if (width < 768) {
        responsiveIndicator.textContent = "Mobile";
    } else if (width >= 768 && width < 1024) {
        responsiveIndicator.textContent = "Tablet";
    } else {
        responsiveIndicator.textContent = "Desktop";
    }
}

updateResponsiveIndicator();
window.addEventListener('resize', updateResponsiveIndicator);

document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (window.innerWidth > 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

searchIcon.addEventListener('click', function() {
    searchInput.focus();
});

searchInput.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
});

searchInput.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
});