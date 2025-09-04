// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            
            // Change menu button icon
            if (mobileMenu.classList.contains('show')) {
                menuBtn.innerHTML = '✕';
            } else {
                menuBtn.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('show');
                menuBtn.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                menuBtn.innerHTML = '☰';
            });
        });
    }
});

// Responsive adjustments for very small screens
function handleExtraSmallScreens() {
    const width = window.innerWidth;
    const teamNames = document.querySelectorAll('.hero-match .team span, .match-body .team .name');
    
    teamNames.forEach(name => {
        if (width <= 320) {
            // Truncate very long team names on extra small screens
            if (name.textContent.length > 10) {
                name.style.fontSize = '10px';
            }
        } else if (width <= 360) {
            // Slightly smaller font for small screens
            if (name.textContent.length > 12) {
                name.style.fontSize = '11px';
            }
        }
    });
}

// Touch feedback for mobile devices
function addTouchFeedback() {
    const touchableElements = document.querySelectorAll('.hero, .match-card, .bottom-navbar a');
    
    touchableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Handle orientation changes
function handleOrientationChange() {
    const heroMatch = document.querySelector('.hero-match');
    
    if (window.innerHeight < 500 && window.orientation !== undefined) {
        // Landscape mode on mobile
        if (heroMatch) {
            heroMatch.style.gap = '15px';
        }
    } else {
        // Portrait mode or desktop
        if (heroMatch) {
            heroMatch.style.gap = '';
        }
    }
}

// Smooth scroll for navigation links (if needed)
function addSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Lazy loading for flag images
function addLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Handle viewport height changes (mobile browser behavior)
function handleViewportChanges() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize all functions
function initializeResponsiveFeatures() {
    handleExtraSmallScreens();
    addTouchFeedback();
    handleOrientationChange();
    addSmoothScroll();
    addLazyLoading();
    handleViewportChanges();
    
    // Add event listeners for dynamic adjustments
    window.addEventListener('resize', function() {
        handleExtraSmallScreens();
        handleOrientationChange();
        handleViewportChanges();
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            handleOrientationChange();
            handleViewportChanges();
        }, 100);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeResponsiveFeatures();
    console.log('CricLiveHub responsive features initialized');
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 

// Apply debounce to resize handler
window.addEventListener('resize', debounce(function() {
    handleExtraSmallScreens();
    handleViewportChanges();
}, 250));

// Accessibility improvements
function addAccessibilityFeatures() {
    // Add keyboard navigation for mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
}


// Scroll Functions
function scrollLeft(section) {
  document.getElementById(section + "-matches").scrollBy({
    left: -300,
    behavior: "smooth"
  });
}

function scrollRight(section) {
  document.getElementById(section + "-matches").scrollBy({
    left: 300,
    behavior: "smooth"
  });
}

// Dummy API Data (Replace with real API fetch)
const dummyData = {
  live: [
    {
      info: "LIVE • ODI • Mumbai",
      team1: { name: "India", flag: "https://flagcdn.com/w20/in.png", score: "260/5", overs: "(50 ov)" },
      team2: { name: "Pakistan", flag: "https://flagcdn.com/w20/pk.png", score: "120/3", overs: "(25 ov)" },
      result: "Pakistan need 140 runs to win"
    }
  ],
  recent: [
    {
      info: "RESULT • T20 • Dubai",
      team1: { name: "Australia", flag: "https://flagcdn.com/w20/au.png", score: "152/7", overs: "(20 ov)" },
      team2: { name: "England", flag: "https://flagcdn.com/w20/gb.png", score: "153/4", overs: "(19.3 ov)" },
      result: "England won by 6 wickets"
    }
  ],
  upcoming: [
    {
      info: "UPCOMING • T20 • Dubai",
      team1: { name: "Bangladesh", flag: "https://flagcdn.com/w20/bd.png", score: "--", overs: "--" },
      team2: { name: "Zimbabwe", flag: "https://flagcdn.com/w20/zw.png", score: "--", overs: "--" },
      result: "Match starts at 7:00 PM"
    }
  ]
};

// Function to render matches
function renderMatches(section, matches) {
  const container = document.getElementById(section + "-matches");
  container.innerHTML = "";
  matches.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-header">
        <span class="info">${match.info}</span>
      </div>
      <div class="match-body">
        <div class="team">
          <img src="${match.team1.flag}" alt="${match.team1.name}">
          <span class="name">${match.team1.name}</span>
          <span class="score">${match.team1.score}</span>
          <span class="overs">${match.team1.overs}</span>
        </div>
        <div class="team">
          <img src="${match.team2.flag}" alt="${match.team2.name}">
          <span class="name">${match.team2.name}</span>
          <span class="score">${match.team2.score}</span>
          <span class="overs">${match.team2.overs}</span>
        </div>
      </div>
      <p class="result">${match.result}</p>
    `;
    container.appendChild(card);
  });
}

// Load Matches (From API or Dummy)
function loadMatches() {
  // Example: Replace dummyData.live with API response
  renderMatches("live", dummyData.live);
  renderMatches("recent", dummyData.recent);
  renderMatches("upcoming", dummyData.upcoming);
}

// On Page Load
window.onload = loadMatches;
