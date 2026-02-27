document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MISSION CARDS TOGGLE (Pehle Wala) ==========
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(function(card) {
        const learnMoreBtn = card.querySelector('.details-btn');
        const missionDetails = card.querySelector('.mission-details');
        const closeBtn = card.querySelector('.close-btn');
        
        learnMoreBtn.addEventListener('click', function() {
            missionDetails.style.display = 'block';
            learnMoreBtn.style.display = 'none';
        });
        
        closeBtn.addEventListener('click', function() {
            missionDetails.style.display = 'none';
            learnMoreBtn.style.display = 'inline-block';
        });
    });
    
    
    // ========== SEARCH FUNCTIONALITY (NAYA) ==========
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // Show "No Results" message
const noResults = document.getElementById('noResults');
const visibleCards = document.querySelectorAll('.mission-card[style="display: block;"]');

if (visibleCards.length === 0 && searchTerm !== '') {
    noResults.style.display = 'block';
} else {
    noResults.style.display = 'none';
}
        
        missionCards.forEach(function(card) {
            const missionName = card.querySelector('h3').textContent.toLowerCase();
            const missionType = card.querySelector('.mission-type').textContent.toLowerCase();
            const missionDesc = card.querySelector('.mission-desc').textContent.toLowerCase();
            
            // Check if search term matches
            if (missionName.includes(searchTerm) || 
                missionType.includes(searchTerm) || 
                missionDesc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    
    // ========== FILTER FUNCTIONALITY (NAYA) ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' to clicked button
            this.classList.add('active');
            
            // Get filter category
            const filterType = this.getAttribute('data-filter');
            
            // Filter missions
            missionCards.forEach(function(card) {
                const missionText = card.textContent.toLowerCase();
                
                if (filterType === 'all') {
                    card.style.display = 'block';
                } 
                else if (filterType === 'satellite' && 
                         (missionText.includes('satellite') || 
                          missionText.includes('aryabhata') || 
                          missionText.includes('insat'))) {
                    card.style.display = 'block';
                }
                else if (filterType === 'moon' && 
                         missionText.includes('chandrayaan')) {
                    card.style.display = 'block';
                }
                else if (filterType === 'mars' && 
                         missionText.includes('mangalyaan')) {
                    card.style.display = 'block';
                }
                else if (filterType === 'rocket' && 
                         missionText.includes('slv')) {
                    card.style.display = 'block';
                }
                else {
                    card.style.display = 'none';
                }
                
                // Animation
                if (card.style.display === 'block') {
                    card.style.animation = 'fadeIn 0.5s';
                }
            });
            
            // Clear search when filter is used
            searchInput.value = '';
        });
    });
    
});
// ========== SCROLL TO TOP BUTTON ==========

const scrollTopBtn = document.getElementById('scrollTop');

// Show/Hide button on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});// ========== LOADING SCREEN ==========

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 2000); // 2 seconds loading
});// ========== DARK/LIGHT MODE TOGGLE ==========

const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    toggleIcon.textContent = '☀️';
}

// Toggle theme on click
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        toggleIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        toggleIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});// ========== HORIZONTAL TIMELINE DRAG SCROLL ==========

const timelineScroll = document.querySelector('.timeline-scroll');

let isDown = false;
let startX;
let scrollLeft;

timelineScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    timelineScroll.style.cursor = 'grabbing';
    startX = e.pageX - timelineScroll.offsetLeft;
    scrollLeft = timelineScroll.scrollLeft;
});

timelineScroll.addEventListener('mouseleave', () => {
    isDown = false;
    timelineScroll.style.cursor = 'grab';
});

timelineScroll.addEventListener('mouseup', () => {
    isDown = false;
    timelineScroll.style.cursor = 'grab';
});

timelineScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineScroll.offsetLeft;
    const walk = (x - startX) * 2;
    timelineScroll.scrollLeft = scrollLeft - walk;
});// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    
    // D = Dark/Light Mode Toggle
    if (e.key === 'd' || e.key === 'D') {
        document.getElementById('themeToggle').click();
    }
    
    // S = Focus Search Bar
    if (e.key === 's' || e.key === 'S') {
        e.preventDefault(); // Browser save dialog na khule
        document.getElementById('searchInput').focus();
    }
    
    // T = Scroll to Top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Escape = Close any open mission details
    if (e.key === 'Escape') {
        document.querySelectorAll('.mission-details').forEach(detail => {
            detail.style.display = 'none';
        });
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.style.display = 'inline-block';
        });
    }
    
});

// Show shortcuts hint
console.log('⌨️ Keyboard Shortcuts: D=Theme, S=Search, T=Top, Esc=Close');
// ========== SHARE BUTTON ==========
const shareBtn = document.getElementById('shareBtn');
const shareMenu = document.getElementById('shareMenu');
const copyLinkBtn = document.getElementById('copyLink');

// Website URL (GitHub Pages wala)
const websiteURL = 'https://sanidhyasharma137.github.io/isro-journey';
const websiteTitle = 'ISRO Journey - India\'s Space Exploration Timeline';

// Toggle share menu
shareBtn.addEventListener('click', function() {
    shareMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!shareBtn.contains(e.target) && !shareMenu.contains(e.target)) {
        shareMenu.classList.remove('active');
    }
});

// Copy Link
copyLinkBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(websiteURL).then(() => {
        copyLinkBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyLinkBtn.textContent = '📋 Copy Link';
        }, 2000);
    });
});

// WhatsApp Share
document.getElementById('whatsappShare').href = 
    `https://wa.me/?text=${encodeURIComponent(websiteTitle + ' - Check out this amazing website! ' + websiteURL)}`;

// Twitter Share
document.getElementById('twitterShare').href = 
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(websiteTitle)}&url=${encodeURIComponent(websiteURL)}`;

// LinkedIn Share
document.getElementById('linkedinShare').href = 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteURL)}`;