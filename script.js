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
    const mobileMenu = document.getElementById('mobileMenu'); }

async function loadUpcomingMatches() {
  try {
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9d1e65527emsh8aa17086e524d8cp13ca59jsn41d4a0125ec4",
        "x-rapidapi-host": ""
      }
    });

    const data = await response.json();
    console.log("API Response:", data);

    const container = document.getElementById("upcoming-matches");
    container.innerHTML = "";

    const flagMap = {
      IND: "in", PAK: "pk", AUS: "au", ENG: "gb", SA: "za",
      NZ: "nz", SL: "lk", BAN: "bd", AFG: "af", WI: "jm",
      ZIM: "zw", IRE: "ie", UAE: "ae", HK: "hk", NEP: "np",
      SCO: "gb-sct", NED: "nl", USA: "us", OMAN: "om"
    };

    (data.typeMatches || []).forEach(type => {
      (type.seriesMatches || []).forEach(series => {
        if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
          series.seriesAdWrapper.matches.forEach(match => {
            const team1 = match.matchInfo.team1;
            const team2 = match.matchInfo.team2;
            const venue = match.matchInfo.venueInfo.ground;

            // ✅ Fix Date
            const timestamp = parseInt(match.matchInfo.startDate);
            const date = new Date(timestamp); // direct use
            const formattedDate = isNaN(date.getTime()) 
              ? "TBD"
              : date.toLocaleString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                });

            const team1Name = team1.teamSName;
            const team2Name = team2.teamSName;

            // ✅ HD Flags
            const team1Flag = `https://flagcdn.com/w40/${flagMap[team1Name] || "un"}.png`;
            const team2Flag = `https://flagcdn.com/w40/${flagMap[team2Name] || "un"}.png`;

            const card = document.createElement("div");
            card.className = "match-card";
            card.innerHTML = `
              <div class="match-header">${venue} • ${formattedDate}</div>
              <div class="match-body">
                <div class="team">
                  <img src="${team1Flag}" alt="${team1Name}" />
                  <span class="name">${team1Name}</span>
                  <span class="score">--</span>
                </div>
                <div class="team">
                  <img src="${team2Flag}" alt="${team2Name}" />
                  <span class="name">${team2Name}</span>
                  <span class="score">--</span>
                </div>
              </div>
            `;
            container.appendChild(card);
          });
        }
      });
    });

  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

loadUpcomingMatches();


// recent-matches
  async function loadRecentMatches(limit = 5) {
  try {
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        "x-rapidapi-key": "a179ffdd2emsh471c0640ff7767fp1bff26jsn046f6d3f956c"
      }
    });

    const data = await response.json();
    const container = document.getElementById("recent-matches");
    container.innerHTML = "";

    let count = 0;

    // ✅ Team flag mapping
    const teamFlags = {
      ind: "in", pak: "pk", eng: "gb", aus: "au",
      sa: "za", nz: "nz", sl: "lk", ban: "bd",
      afg: "af", wi: "jm", ire: "ie", zim: "zw"
    };

    data.typeMatches.forEach(type => {
      type.seriesMatches.forEach(series => {
        if (series.seriesAdWrapper) {
          series.seriesAdWrapper.matches.forEach(match => {
            if (count < limit) {
              const info = match.matchInfo;
              const score = match.matchScore;

              const team1 = info.team1.teamName;
              const team2 = info.team2.teamName;

              const team1Inngs = score?.team1Score?.inngs1;
              const team2Inngs = score?.team2Score?.inngs1;

              const team1Score = team1Inngs ? `${team1Inngs.runs}/${team1Inngs.wickets}` : "";
              const team1Overs = team1Inngs ? `(${team1Inngs.overs} ov)` : "";

              const team2Score = team2Inngs ? `${team2Inngs.runs}/${team2Inngs.wickets}` : "";
              const team2Overs = team2Inngs ? `(${team2Inngs.overs} ov)` : "";

              const result = info.status;

              // ✅ Flag mapping apply
              const team1Code = teamFlags[info.team1.teamSName.toLowerCase()] || "un";
              const team2Code = teamFlags[info.team2.teamSName.toLowerCase()] || "un";

              const card = `
                <div class="match-card">
                  <div class="match-header">
                    <span class="info">RESULT • ${info.matchDesc} • ${info.venueInfo.ground}</span>
                  </div>
                  <div class="match-body">
                    <div class="team">
                      <img src="https://flagcdn.com/w40/${team1Code}.png" alt="${team1}">
                      <span class="name">${team1}</span>
                      <span class="score">${team1Score}</span>
                      <span class="overs">${team1Overs}</span>
                    </div>
                    <div class="team">
                      <img src="https://flagcdn.com/w40/${team2Code}.png" alt="${team2}">
                      <span class="name">${team2}</span>
                      <span class="score">${team2Score}</span>
                      <span class="overs">${team2Overs}</span>
                    </div>
                  </div>
                  <p class="result">${result}</p>
                </div>
              `;

              container.innerHTML += card;
              count++;
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("Error loading recent matches:", error);
  }
}

loadRecentMatches();

// upcoming-matches

async function loadUpcomingMatches(limit = 5) {
    try {
      const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": "a179ffdd2emsh471c0640ff7767fp1bff26jsn046f6d3f956c"
        }
      });

      const data = await response.json();
      const container = document.getElementById("upcoming-matches");
      container.innerHTML = "";

      let count = 0;

      // ✅ Team flag mapping
      const teamFlags = {
        ind: "in", pak: "pk", eng: "gb", aus: "au",
        sa: "za", nz: "nz", sl: "lk", ban: "bd",
        afg: "af", wi: "jm", ire: "ie", zim: "zw", uae: "ae"
      };

      data.typeMatches.forEach(type => {
        type.seriesMatches.forEach(series => {
          if (series.seriesAdWrapper) {
            series.seriesAdWrapper.matches.forEach(match => {
              if (count < limit) {
                const info = match.matchInfo;

                const team1 = info.team1.teamName;
                const team2 = info.team2.teamName;

                // ✅ Flag mapping
                const team1Code = teamFlags[info.team1.teamSName.toLowerCase()] || "un";
                const team2Code = teamFlags[info.team2.teamSName.toLowerCase()] || "un";

                // ✅ Date formatting
                const matchDate = new Date(info.startDate).toLocaleString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                  hour: "2-digit", minute: "2-digit"
                });

                const card = `
                  <div class="match-card">
                    <div class="match-header">
                      <span class="info">UPCOMING • ${info.matchDesc} • ${info.venueInfo.ground}</span>
                    </div>
                    <div class="match-body">
                      <div class="team">
                        <img src="https://flagcdn.com/w40/${team1Code}.png" alt="${team1}">
                        <span class="name">${team1}</span>
                      </div>
                      <div class="team">
                        <img src="https://flagcdn.com/w40/${team2Code}.png" alt="${team2}">
                        <span class="name">${team2}</span>
                      </div>
                    </div>
                    <p class="result">📅 ${matchDate}</p>
                  </div>
                `;

                container.innerHTML += card;
                count++;
              }
            });
          }
        });
      });
    } catch (error) {
      console.error("Error loading upcoming matches:", error);
    }
  }

  loadUpcomingMatches();