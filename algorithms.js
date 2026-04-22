// ============================================
// ALGORITHMS.JS - MODULAR SECTION ALGORITHMS
// ============================================

// ============ ALGORITHM 1: NAVIGATION MANAGEMENT ============
const navigationAlgorithm = {
    // Initialize navigation bar
    init: function() {
        this.setupEventListeners();
        this.displayCurrentLocation();
    },

    setupEventListeners: function() {
        const signinBtn = document.querySelector('.signin-btn');
        if (signinBtn) {
            signinBtn.addEventListener('click', () => {
                alert('Sign in to StudentNest Cameroon - Find your perfect student housing in Bamenda & Bambili');
            });
        }
    },

    displayCurrentLocation: function() {
        const locationDisplay = document.querySelector('.location-text');
        if (locationDisplay) {
            locationDisplay.textContent = 'Bamenda & Bambili, Cameroon';
        }
    }
};

// ============ ALGORITHM 2: DATE SELECTOR MANAGEMENT ============
const dateSelectorAlgorithm = {
    // Initialize date selector
    init: function() {
        this.setToday();
        this.setupEventListeners();
    },

    setToday: function() {
        const today = new Date('2026-04-20');
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const displayDate = today.toLocaleDateString('en-US', options);
        document.getElementById('selectedDateDisplay').textContent = displayDate;
    },

    setupEventListeners: function() {
        const dateBtn = document.getElementById('dateBtn');
        if (dateBtn) {
            dateBtn.addEventListener('click', () => {
                alert('Date Picker - Select your move-in date');
            });
        }
    }
};

// ============ ALGORITHM 3: HEADER & RESULTS COUNTER ============
const headerAlgorithm = {
    // Update results counter
    updateCounter: function(count) {
        const counter = document.getElementById('resultsCounter');
        if (counter) {
            if (count === 0) {
                counter.textContent = 'No listings found';
            } else if (count === 1) {
                counter.textContent = '1 listing found';
            } else {
                counter.textContent = `${count} listings found`;
            }
        }
    },

    updateTitle: function(region = 'Bamenda & Bambili') {
        const title = document.querySelector('.listings-title');
        if (title) {
            title.textContent = `Furnished student apartments in ${region}`;
        }
    }
};

// ============ ALGORITHM 4: FILTER SYSTEM ============
const filterAlgorithm = {
    // Filter by all (no filter)
    filterByAll: function(listings) {
        return listings;
    },

    // Filter by price (sort low to high)
    filterByPrice: function(listings) {
        return [...listings].sort((a, b) => a.price - b.price);
    },

    // Filter by capacity (1-2 people)
    filterByCapacity: function(listings) {
        return listings.filter(l => l.people <= 2);
    },

    // Filter by amenities (4+ amenities)
    filterByAmenities: function(listings) {
        return listings.filter(l => l.amenities.length >= 4).sort((a, b) => b.amenities.length - a.amenities.length);
    },

    // Filter by university
    filterByUniversity: function(listings) {
        const universities = [...new Set(listings.map(l => l.university))];
        console.log('Available universities:', universities);
        return listings;
    },

    // Apply filter based on type
    apply: function(listings, filterType) {
        switch(filterType) {
            case 'all':
                return this.filterByAll(listings);
            case 'price':
                return this.filterByPrice(listings);
            case 'people':
                return this.filterByCapacity(listings);
            case 'amenities':
                return this.filterByAmenities(listings);
            case 'university':
                return this.filterByUniversity(listings);
            default:
                return listings;
        }
    }
};

// ============ ALGORITHM 5: SEARCH SYSTEM ============
const searchAlgorithm = {
    // Live search algorithm
    execute: function(listings, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return listings;
        }

        const term = searchTerm.toLowerCase();
        return listings.filter(listing => {
            const titleMatch = listing.title.toLowerCase().includes(term);
            const locationMatch = listing.location.toLowerCase().includes(term);
            const universityMatch = listing.university.toLowerCase().includes(term);
            const amenitiesMatch = listing.amenities.some(a => a.toLowerCase().includes(term));
            
            return titleMatch || locationMatch || universityMatch || amenitiesMatch;
        });
    },

    // Real-time search trigger
    setupRealTimeSearch: function(listingsData, renderCallback, updateMapCallback) {
        const searchBox = document.getElementById('searchBox');
        const searchBtn = document.getElementById('searchBtn');

        const performSearch = () => {
            const term = searchBox.value;
            const results = this.execute(listingsData, term);
            renderCallback(results);
            updateMapCallback(results);
            headerAlgorithm.updateCounter(results.length);
        };

        searchBox.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
    }
};

// ============ ALGORITHM 6: LISTINGS RENDERING ============
const renderingAlgorithm = {
    // Create a single listing card
    createCard: function(listing, isWishlisted = false) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <div class="listing-image-wrapper">
                <div class="listing-image-placeholder">${listing.image}</div>
                <button class="wishlist-heart ${isWishlisted ? 'active' : ''}" data-id="${listing.id}">
                    ${isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <p class="listing-location">📍 ${listing.location}</p>
                <p class="listing-unit">🎓 ${listing.university}</p>
                <div class="listing-price">
                    FCFA${listing.price.toLocaleString()}
                    <span class="price-period">per month</span>
                </div>
                <div class="listing-specs">
                    <div class="spec">
                        <span class="spec-icon">🛏️</span>
                        <span>${listing.rooms} room${listing.rooms > 1 ? 's' : ''}</span>
                    </div>
                    <div class="spec">
                        <span class="spec-icon">👥</span>
                        <span>${listing.people} person</span>
                    </div>
                    <div class="spec">
                        <span class="spec-icon">📐</span>
                        <span>${listing.size}</span>
                    </div>
                </div>
                <div class="listing-amenities">
                    ${listing.amenities.slice(0, 3).map(a => `<span class="amenity-badge">${a}</span>`).join('')}
                </div>
            </div>
        `;
        return card;
    },

    // Render all listings
    renderAll: function(listings, wishlist = []) {
        const container = document.getElementById('listingsContainer');
        container.innerHTML = '';

        if (listings.length === 0) {
            container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #636e72;">No listings found in Bamenda & Bambili. Try adjusting your search.</div>';
            return;
        }

        listings.forEach(listing => {
            const isWishlisted = wishlist.includes(listing.id);
            const card = this.createCard(listing, isWishlisted);
            container.appendChild(card);
        });
    }
};

// ============ ALGORITHM 7: MAP INITIALIZATION & MANAGEMENT ============
const mapAlgorithm = {
    // Bamenda/Bambili coordinates
    BAMENDA_CENTER: { lat: 5.9631, lng: 10.1591 },
    BAMBILI_CENTER: { lat: 6.1167, lng: 10.2833 },

    map: null,
    markers: [],

    // Initialize map centered on Bamenda & Bambili
    initialize: function() {
        // Center between Bamenda and Bambili
        const center = { lat: 6.0399, lng: 10.2212 };
        
        this.map = L.map('map').setView([center.lat, center.lng], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            maxNativeZoom: 18
        }).addTo(this.map);

        return this.map;
    },

    // Add markers for listings
    addMarkers: function(listings) {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Add new markers
        listings.forEach(listing => {
            const marker = L.circleMarker([listing.lat, listing.lng], {
                radius: 12,
                fillColor: '#6c5ce7',
                color: '#5f3dc4',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
            }).bindPopup(`
                <div style="font-weight: bold; color: #6c5ce7; font-size: 1.1rem;">FCFA${listing.price.toLocaleString()}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">${listing.title.substring(0, 40)}...</div>
                <div style="font-size: 0.85rem; color: #636e72; margin-top: 0.25rem;">${listing.location}</div>
            `);

            marker.addTo(this.map);
            this.markers.push(marker);
        });

        // Fit bounds if markers exist
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1), { maxZoom: 13 });
        }
    },

    // Update map footer
    updateFooter: function(currentCount, totalCount) {
        document.getElementById('mapCount').textContent = currentCount;
        document.getElementById('totalCount').textContent = totalCount;
    }
};

// ============ ALGORITHM 8: MODAL MANAGEMENT ============
const modalAlgorithm = {
    modal: null,
    modalBody: null,

    init: function() {
        this.modal = document.getElementById('listingModal');
        this.modalBody = document.getElementById('modalBody');
        this.setupCloseHandlers();
    },

    setupCloseHandlers: function() {
        const closeBtn = document.getElementById('modalClose');
        const modal = this.modal;

        closeBtn.addEventListener('click', () => this.close());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    // Show listing details modal
    show: function(listing, isWishlisted = false) {
        this.modalBody.innerHTML = `
            <div class="modal-image-placeholder">${listing.image}</div>
            <div class="modal-header-section">
                <div>
                    <h2 class="modal-title">${listing.title}</h2>
                    <div class="modal-price">FCFA${listing.price.toLocaleString()}/month</div>
                    <div class="modal-location">📍 ${listing.location}</div>
                </div>
                <button class="wishlist-heart ${isWishlisted ? 'active' : ''}" data-id="${listing.id}">
                    ${isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">Description</h3>
                <p class="modal-description">${listing.description}</p>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">Property Details</h3>
                <div class="modal-stats">
                    <div class="stat-box">
                        <div class="stat-value">${listing.rooms}</div>
                        <div class="stat-label">Bedroom${listing.rooms > 1 ? 's' : ''}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${listing.size}</div>
                        <div class="stat-label">Size</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${listing.people}</div>
                        <div class="stat-label">Person</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">FCFA${listing.price.toLocaleString()}</div>
                        <div class="stat-label">Monthly</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">University</h3>
                <p class="modal-description">${listing.university}</p>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">Amenities</h3>
                <div class="modal-amenities">
                    ${listing.amenities.map(a => `<div class="modal-amenity">✓ ${a}</div>`).join('')}
                </div>
            </div>

            <div class="modal-actions">
                <button class="action-btn primary">Contact Landlord</button>
                <button class="action-btn">Schedule Tour</button>
            </div>
        `;

        this.modal.classList.add('show');
    },

    close: function() {
        this.modal.classList.remove('show');
    }
};

// ============ ALGORITHM 9: WISHLIST MANAGEMENT ============
const wishlistAlgorithm = {
    // Toggle wishlist
    toggle: function(listingId, listings) {
        let wishlist = JSON.parse(localStorage.getItem('studentNestWishlist')) || [];
        const index = wishlist.indexOf(listingId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(listingId);
        }
        
        localStorage.setItem('studentNestWishlist', JSON.stringify(wishlist));
        return wishlist;
    },

    // Get current wishlist
    get: function() {
        return JSON.parse(localStorage.getItem('studentNestWishlist')) || [];
    },

    // Update wishlist buttons display
    updateButtons: function() {
        const wishlist = this.get();
        document.querySelectorAll('.wishlist-heart').forEach(btn => {
            const id = parseInt(btn.getAttribute('data-id'));
            const isWishlisted = wishlist.includes(id);
            btn.classList.toggle('active', isWishlisted);
            btn.textContent = isWishlisted ? '❤️' : '🤍';
        });
    }
};

// Export algorithms for use in app.js
window.ALGORITHMS = {
    navigation: navigationAlgorithm,
    dateSelector: dateSelectorAlgorithm,
    header: headerAlgorithm,
    filter: filterAlgorithm,
    search: searchAlgorithm,
    rendering: renderingAlgorithm,
    map: mapAlgorithm,
    modal: modalAlgorithm,
    wishlist: wishlistAlgorithm
};
