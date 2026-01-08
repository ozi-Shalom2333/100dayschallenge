// Gallery data
const galleryItems = [
    {
        id: 1,
        title: "Mountain Sunrise",
        category: "nature",
        description: "Beautiful sunrise over snow-capped mountains with warm morning light.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "landscape"
    },
    {
        id: 2,
        title: "Urban Architecture",
        category: "urban",
        description: "Modern skyscrapers with geometric patterns against a clear blue sky.",
        imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "portrait"
    },
    {
        id: 3,
        title: "Portrait of a Woman",
        category: "portrait",
        description: "Close-up portrait with dramatic lighting and soft focus background.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
        aspectRatio: "portrait"
    },
    {
        id: 4,
        title: "Abstract Art",
        category: "abstract",
        description: "Colorful fluid art with vibrant blues, pinks, and purples blending together.",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "square"
    },
    {
        id: 5,
        title: "Forest Pathway",
        category: "nature",
        description: "Sunlight filtering through trees along a winding forest path in autumn.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "landscape"
    },
    {
        id: 6,
        title: "City Night Lights",
        category: "urban",
        description: "Long exposure of city traffic at night with streaks of red and white lights.",
        imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "landscape"
    },
    {
        id: 7,
        title: "Beach Sunset",
        category: "nature",
        description: "Golden hour at the beach with gentle waves and dramatic cloud formations.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "landscape"
    },
    {
        id: 8,
        title: "Geometric Patterns",
        category: "abstract",
        description: "Minimalist geometric shapes and patterns in monochromatic color scheme.",
        imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
        aspectRatio: "square"
    }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const viewButtons = document.querySelectorAll('.view-btn');
const categoryFilter = document.getElementById('categoryFilter');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxDimensions = document.getElementById('lightboxDimensions');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const sizeIndicator = document.getElementById('currentSize');
const themeToggle = document.getElementById('themeToggle');
const themeText = document.querySelector('.theme-text');

// State variables
let currentView = 'grid';
let currentCategory = 'all';
let currentLightboxIndex = 0;
let filteredItems = [];

// ===== THEME FUNCTIONALITY =====

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update button text based on theme
    if (theme === 'dark') {
        themeText.textContent = 'Light Mode';
    } else {
        themeText.textContent = 'Dark Mode';
    }
}

// Function to get system preference
function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to initialize theme
function initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Use system preference
        const systemTheme = getSystemPreference();
        setTheme(systemTheme);
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    }
});

// ===== GALLERY FUNCTIONALITY =====

// Initialize gallery
function initializeGallery() {
    renderGallery();
    setupEventListeners();
    updateSizeIndicator();
    initTheme(); // Initialize theme
    
    // Add theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
}

// Render gallery items
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    filteredItems = galleryItems.filter(item => {
        return currentCategory === 'all' || item.category === currentCategory;
    });
    
    filteredItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${currentView}`;
        galleryItem.dataset.index = index;
        
        const spanHeight = getMasonrySpan(item.aspectRatio);
        
        galleryItem.style.gridRowEnd = currentView === 'masonry' ? `span ${spanHeight}` : '';
        
        galleryItem.innerHTML = `
            <div class="image-container">
                <img src="${item.imageUrl}" alt="${item.title}" class="gallery-image">
                <div class="image-overlay">
                    <h3 class="image-title">${item.title}</h3>
                    <span class="image-category">${item.category}</span>
                </div>
                <span class="category-badge">${item.category}</span>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });
    
    galleryGrid.className = `gallery-grid ${currentView}`;
}

// Calculate masonry span based on aspect ratio
function getMasonrySpan(aspectRatio) {
    switch(aspectRatio) {
        case 'portrait': return 30;
        case 'landscape': return 15;
        case 'square': return 20;
        default: return 20;
    }
}

// Open lightbox with image
function openLightbox(index) {
    const item = filteredItems[index];
    currentLightboxIndex = index;
    
    lightboxImage.src = item.imageUrl;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxCategory.textContent = item.category;
    lightboxDimensions.textContent = `${item.aspectRatio} aspect ratio`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show/hide navigation buttons
    lightboxPrev.style.display = index > 0 ? 'flex' : 'none';
    lightboxNext.style.display = index < filteredItems.length - 1 ? 'flex' : 'none';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (direction === 'prev' && currentLightboxIndex > 0) {
        currentLightboxIndex--;
        openLightbox(currentLightboxIndex);
    } else if (direction === 'next' && currentLightboxIndex < filteredItems.length - 1) {
        currentLightboxIndex++;
        openLightbox(currentLightboxIndex);
    }
}

// Update size indicator for responsive design
function updateSizeIndicator() {
    const width = window.innerWidth;
    
    if (width < 480) {
        sizeIndicator.textContent = "Mobile (Small)";
    } else if (width < 768) {
        sizeIndicator.textContent = "Mobile";
    } else if (width < 1024) {
        sizeIndicator.textContent = "Tablet";
    } else {
        sizeIndicator.textContent = "Desktop";
    }
}

// Set up event listeners
function setupEventListeners() {
    // View mode buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            renderGallery();
        });
    });
    
    // Category filter
    categoryFilter.addEventListener('change', () => {
        currentCategory = categoryFilter.value;
        renderGallery();
    });
    
    // Lightbox close
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Lightbox background click to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Lightbox navigation
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });
    
    // Window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSizeIndicator();
            renderGallery();
        }, 250); // Debounce to improve performance
    });
}

// Preload critical images for better performance
function preloadImages() {
    // Preload first 2 images for better initial load
    const preloadUrls = [
        galleryItems[0].imageUrl,
        galleryItems[1].imageUrl
    ];
    
    preloadUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    preloadImages();
});