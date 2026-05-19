// Dynamic Weather Updates & Search Intercepts
const weatherIcons = {
    'Sunny Intervals': '⛅',
    'Rainy Showers': '🌧️',
    'Thunderstorms': '⚡',
    'Cloudy Skies': '☁️',
    'Heavy Snow': '❄️',
    'Clear Sunny': '☀️'
};
const weatherConditions = Object.keys(weatherIcons);

document.getElementById('city-search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const city = this.value;
        if (city) {
            this.value = '';
            
            // Intercept with an interstitial ad before updating the weather!
            showSessionInterstitialAd(() => {
                const randCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
                const randTemp = Math.floor(Math.random() * 26) + 10; // 10 to 35°
                
                // Update Main Weather Card Elements to feel fully functional and alive!
                const tempEl = document.getElementById('temperature');
                const condEl = document.getElementById('condition');
                const iconEl = document.getElementById('weather-icon');
                
                if (tempEl) tempEl.innerText = `${randTemp}°`;
                if (condEl) condEl.innerText = randCondition;
                if (iconEl) iconEl.innerText = weatherIcons[randCondition];
                
                // Update stats randomly to match
                document.querySelectorAll('.stats-grid .stat').forEach((stat, i) => {
                    const val = stat.querySelector('p');
                    if (val) {
                        if (i === 0) val.innerText = `${Math.floor(Math.random() * 60) + 30}%`; // Humidity
                        else if (i === 1) val.innerText = `${Math.floor(Math.random() * 25) + 5} km/h`; // Wind
                        else val.innerText = Math.random() > 0.5 ? 'Very High' : 'Moderate'; // UV
                    }
                });

                // Display success celebration modal!
                const celebrationModal = document.getElementById('celebrationModal');
                if (celebrationModal) celebrationModal.style.display = 'flex';
            });
        }
    }
});

// Update date
const dateElement = document.getElementById('current-date');
const now = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
if (dateElement) dateElement.innerText = now.toLocaleDateString('en-US', options);

document.querySelectorAll('.stat, .day').forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        // Intercept with an interstitial ad before showing detailed views!
        showSessionInterstitialAd(() => {
            openDetail(item, index);
        });
    });
});

function openDetail(item, id) {
    const label = item.querySelector('span').innerText;
    const value = item.querySelector('p').innerText;
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div class="modal-hero" style="background:url('https://picsum.photos/seed/${id+200}/1200/600') center/cover; height:350px; border-radius:12px; margin-bottom:2rem;"></div>
        <h2 style="font-size:3rem; margin:1rem 0; font-family: 'Quicksand', sans-serif; font-weight:700; color:#333;">${label}: ${value}</h2>
        <p style="font-size:1.2rem; color:#555; line-height:1.8; margin-bottom:2rem;">This metric is calculated using high-precision meteorological sensors and satellite data. Understanding ${label} is crucial for planning your day and staying safe in changing environmental conditions.</p>
        
        <div class="extensive-info" style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin:3rem 0;">
            <div style="background:rgba(52,152,219,0.05); padding:2rem; border-radius:12px; border:1px solid rgba(52,152,219,0.1);">
                <h3 style="margin-bottom:1rem; color:#333;">Meteorological Context</h3>
                <p style="font-size:0.9rem; color:#666;">Historical average for this time of year: ${value.includes('%') ? '42%' : '14 km/h'}. You are currently ${Math.random() > 0.5 ? 'above' : 'below'} the 10-year trend line.</p>
            </div>
            <div style="background:rgba(52,152,219,0.05); padding:2rem; border-radius:12px; border:1px solid rgba(52,152,219,0.1);">
                <h3 style="margin-bottom:1rem; color:#333;">Health & Safety</h3>
                <p style="font-size:0.9rem; color:#666;">${label === 'UV Index' ? 'Sunscreen SPF 30+ recommended.' : 'Optimal conditions for outdoor activities.'}</p>
            </div>
        </div>

        <div class="image-gallery" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-top:2rem;">
            <img src="https://picsum.photos/seed/${id+300}/400/400" style="width:100%; border-radius:8px;">
            <img src="https://picsum.photos/seed/${id+400}/400/400" style="width:100%; border-radius:8px;">
            <img src="https://picsum.photos/seed/${id+500}/400/400" style="width:100%; border-radius:8px;">
        </div>
    `;
    
    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Close Celebration Modal Handler
const btnCloseCelebration = document.getElementById('btn-close-celebration');
if (btnCloseCelebration) {
    btnCloseCelebration.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
    });
}

// ========================================================
// STRATEGIC AD SYSTEM ENGINE (WEATHER SPHERE EDITION)
// ========================================================

// 1. Rotating Bottom Banner Ad Pool
const FLOATING_ADS = [
    {
        badge: 'PRO SPONSOR',
        text: '⛈️ <strong>StormGuard Pro:</strong> Hyper-local lightning & rain warnings delivered 15 mins before impact. Get 14 days free!',
        buttonText: 'Claim Trial',
        alertMsg: 'Opening StormGuard trial signup page... Your 14-day free trial has been activated!'
    },
    {
        badge: 'TRAVEL DEAL',
        text: '✈️ <strong>Maldives Paradise:</strong> Escape the rainfronts with 40% off all-inclusive overwater villas. Book by midnight!',
        buttonText: 'View Deals',
        alertMsg: 'Redirecting to Maldives Resorts booking system... Direct 40% discount rates loaded!'
    },
    {
        badge: 'OUTDOOR GEAR',
        text: '🧥 <strong>AeroShield Active Shells:</strong> 100% windproof & stormproof active coats. Use code <strong>DRY20</strong> for 20% off.',
        buttonText: 'Shop Now',
        alertMsg: 'Opening AeroShield Apparel... Coupon DRY20 applied at cart!'
    },
    {
        badge: 'WEATHER PRO',
        text: '🌦️ <strong>WeatherSphere Pro:</strong> Unlock real-time interactive Doppler radar & UV warning scales. Only $0.99/mo.',
        buttonText: 'Upgrade Now',
        alertMsg: 'Opening WeatherSphere Pro upgrade panel... Elevate your weather metrics!'
    },
    {
        badge: 'AUTOMOTIVE',
        text: '🚗 <strong>AquaGlide Blades:</strong> Zero-streak silent rain sweeps. Buy one get one free wiper blades today!',
        buttonText: 'Claim BOGO',
        alertMsg: 'Redirecting to AquaGlide Automotive... Buy-One-Get-One-Free offer added to your cart!'
    },
    {
        badge: 'TRAVEL VILLA',
        text: '🏨 <strong>Bali Ocean Resorts:</strong> Lock in 5-star ocean-view private suites for $69/night. Free cancellations.',
        buttonText: 'Book Suite',
        alertMsg: 'Redirecting to Bali Resorts booking portal... Special $69/night rate secured!'
    }
];

// 2. Interchanging Full-Screen Recurring Pop-up Ad Pool
const POPUP_ADS = [
    {
        type: 'premium',
        badge: '🌦️',
        title: 'WeatherSphere Pro',
        subtitle: 'LIMITED TIME UPGRADE OFFER',
        desc: 'Unlock real-time interactive Doppler radar maps, 100-year historical climate logs, and 100% ad-free minimalist forecasting forever.',
        promoText: 'Special Upgrade Deal Expires In:',
        hasTimer: true,
        acceptBtnText: 'Go Premium ($2)',
        declineBtnText: 'Close Offer',
        alertMsg: '🎉 Welcome to WeatherSphere Pro! All ads have been successfully disabled.'
    },
    {
        type: 'sponsor',
        badge: '⚡',
        title: 'StormGuard Pro',
        subtitle: 'SPONSORED PRECIPITATION ALERTS',
        desc: 'Get high-accuracy, hyper-local storm warning signals pushed directly to your devices 15 minutes before the front hits your exact GPS coordinates.',
        promoText: 'SPECIAL PROMO: GUARD20 (20% OFF)',
        hasTimer: false,
        acceptBtnText: 'Start Free Trial',
        declineBtnText: 'Skip Ad',
        alertMsg: 'Redirecting to StormGuard App Store... Enjoy your premium weather guard trial!'
    },
    {
        type: 'sponsor',
        badge: '🌴',
        title: 'Tropical Resorts Maldives',
        subtitle: 'SPONSORED SUNFRONT SEARCH',
        desc: 'Escape the cold fronts and rainy seasons with direct 40% savings on 5-star all-inclusive tropical bungalows with private reef pools.',
        promoText: 'CLAIM SPECIAL TRAVEL RATE NOW',
        hasTimer: false,
        acceptBtnText: 'View Bungalows',
        declineBtnText: 'No Thanks',
        alertMsg: 'Redirecting to Maldives Resorts booking engine... Direct rates unlocked!'
    },
    {
        type: 'sponsor',
        badge: '🧥',
        title: 'AeroShield Shells',
        subtitle: 'NATIVE OUTDOOR GEAR SPONSOR',
        desc: 'Military-grade stormproof activewear designed to lock out wind, rain, and cold while keeping you 100% dry and sweat-free.',
        promoText: 'USE DISCOUNT CODE "DRY30" FOR 30% OFF',
        hasTimer: false,
        acceptBtnText: 'Shop AeroShield',
        declineBtnText: 'Close Ad',
        alertMsg: 'Redirecting to AeroShield store... Discount code DRY30 copied to clipboard!'
    },
    {
        type: 'sponsor',
        badge: '✈️',
        title: 'World Explorer Guide',
        subtitle: 'FREE DIRECT DIGITAL GUIDE DOWNLOAD',
        desc: 'Learn the best micro-climate travel months, packing lists, and secret island routes for the perfect sunny holiday.',
        promoText: 'FREE TRAVEL PDF READY FOR DOWNLOAD',
        hasTimer: false,
        acceptBtnText: 'Download Free PDF',
        declineBtnText: 'Skip Guide',
        alertMsg: 'Downloading your free World Explorer micro-climate travel guide... Check your downloads!'
    }
];

// 3. Floating Banner Rotation Logic
const floatingAdBanner = document.getElementById('floating-ad-banner');
let currentAdIdx = 0;
let bannerRotationInterval = null;

function renderBannerAd(idx) {
    if (!floatingAdBanner || FLOATING_ADS.length === 0) return;
    const ad = FLOATING_ADS[idx];
    floatingAdBanner.innerHTML = `
        <div class="banner-content">
            <span class="banner-badge">${ad.badge}</span>
            <p>${ad.text}</p>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-shop">${ad.buttonText}</button>
            <button class="btn-banner-close" id="btn-banner-close">&times;</button>
        </div>
    `;
}

function rotateFloatingAd() {
    if (!floatingAdBanner || floatingAdBanner.style.display === 'none') return;
    floatingAdBanner.classList.add('fade-out');
    setTimeout(() => {
        currentAdIdx = (currentAdIdx + 1) % FLOATING_ADS.length;
        renderBannerAd(currentAdIdx);
        floatingAdBanner.classList.remove('fade-out');
    }, 400);
}

// Slide-in the floating banner after 4 seconds
setTimeout(() => {
    if (floatingAdBanner) {
        renderBannerAd(currentAdIdx);
        floatingAdBanner.style.display = 'flex';
        bannerRotationInterval = setInterval(rotateFloatingAd, 10000);
    }
}, 4000);

// Safe Event Delegation for floating banner
if (floatingAdBanner) {
    floatingAdBanner.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-banner-close') {
            floatingAdBanner.style.display = 'none';
            if (bannerRotationInterval) clearInterval(bannerRotationInterval);
        } else if (target.id === 'btn-banner-shop') {
            const activeAd = FLOATING_ADS[currentAdIdx];
            alert(activeAd.alertMsg);
            floatingAdBanner.style.display = 'none';
            if (bannerRotationInterval) clearInterval(bannerRotationInterval);
        }
    });
}

// 4. Recurring Interchanging Pop-up Modal Logic
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');
let activePopupIdx = 0;
let upgradeCountdownTimer = null;
let nextPopupTimeout = null;

function startPremiumCountdown() {
    let durationSeconds = 10 * 60; // 10 minutes
    const display = document.getElementById('premium-timer-display');
    if (!display) return;
    
    if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
    upgradeCountdownTimer = setInterval(() => {
        durationSeconds--;
        if (durationSeconds >= 0) {
            const mins = Math.floor(durationSeconds / 60);
            const secs = durationSeconds % 60;
            display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            clearInterval(upgradeCountdownTimer);
            premiumUpgradeModal.style.display = 'none';
            scheduleNextPopup();
        }
    }, 1000);
}

function renderPopupAdContent(ad) {
    if (!premiumUpgradeModal) return;
    
    let promoHTML = ad.hasTimer
        ? `<div style="background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.08); padding: 1.2rem; border-radius: 12px; margin-bottom: 2.5rem; display: flex; justify-content: center; align-items: center; gap: 1rem; color:#333;">
               <span style="font-size: 0.85rem; font-weight: 700; color: #666;">${ad.promoText}</span>
               <span id="premium-timer-display" style="font-family: monospace; font-size: 1.5rem; font-weight: 800; color: #3498db;">10:00</span>
           </div>`
        : `<div style="background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.08); padding: 1.2rem; border-radius: 12px; margin-bottom: 2.5rem; text-align: center;">
               <span style="font-size: 0.95rem; font-weight: 800; color: #3498db; letter-spacing: 0.5px; text-transform: uppercase;">${ad.promoText}</span>
           </div>`;

    premiumUpgradeModal.innerHTML = `
        <div class="modal-content" style="max-width: 540px; text-align: center; border-color: rgba(52, 152, 219, 0.15); box-shadow: 0 0 40px rgba(52, 152, 219, 0.05);">
            <div class="celebration-badge" style="font-size: 4rem; animation: pulse 2s infinite; margin-bottom: 1rem;">${ad.badge}</div>
            <h2 style="font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 2.2rem; color: #3498db; margin: 1rem 0 0.5rem; letter-spacing: -1px; text-transform: uppercase;">${ad.title}</h2>
            <p style="color: #888; font-size: 0.85rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.5rem;">${ad.subtitle}</p>
            <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">${ad.desc}</p>
            ${promoHTML}
            <div style="display: flex; gap: 1.5rem;">
                <button class="btn-secondary" id="btn-decline-upgrade" style="flex: 1; padding: 1rem;">${ad.declineBtnText}</button>
                <button class="ad-btn" id="btn-accept-upgrade" style="flex: 1; padding: 1rem; background: #3498db; color:white;">${ad.acceptBtnText}</button>
            </div>
        </div>
    `;
    if (ad.hasTimer) startPremiumCountdown();
}

function triggerPopupAdFlow() {
    if (!premiumUpgradeModal) return;
    renderPopupAdContent(POPUP_ADS[activePopupIdx]);
    premiumUpgradeModal.style.display = 'flex';
}

function scheduleNextPopup(delayMs = 60000) {
    if (nextPopupTimeout) clearTimeout(nextPopupTimeout);
    nextPopupTimeout = setTimeout(() => {
        activePopupIdx = (activePopupIdx + 1) % POPUP_ADS.length;
        triggerPopupAdFlow();
    }, delayMs);
}

// Start recurring popup loop after 15 seconds
setTimeout(triggerPopupAdFlow, 15000);

// Event delegation on popup modal
if (premiumUpgradeModal) {
    premiumUpgradeModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-decline-upgrade') {
            premiumUpgradeModal.style.display = 'none';
            if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
            scheduleNextPopup();
        } else if (target.id === 'btn-accept-upgrade') {
            const activeAd = POPUP_ADS[activePopupIdx];
            alert(activeAd.alertMsg);
            premiumUpgradeModal.style.display = 'none';
            if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
            
            if (activeAd.type === 'premium') {
                // Remove all ads for WeatherSphere Pro!
                if (floatingAdBanner) floatingAdBanner.style.display = 'none';
                if (bannerRotationInterval) clearInterval(bannerRotationInterval);
                if (nextPopupTimeout) clearTimeout(nextPopupTimeout);
            } else {
                scheduleNextPopup();
            }
        }
    });
}

// 5. Interstitial Search/Details Completion Skip-Ad
const interstitialModal = document.getElementById('interstitialAdModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');
let interstitialTimer = null;
let interstitialCallback = null;

function showSessionInterstitialAd(onClosed) {
    if (!interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        if (interstitialCallback) interstitialCallback();
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Travel Offer Claimed! Coupon code "ESCAPE" has been copied to your clipboard.');
        interstitialModal.style.display = 'none';
        if (interstitialCallback) interstitialCallback();
    });
}

