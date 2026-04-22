// Sample listings data for student housing
const listings = [
    {
        id: 1,
        title: "Cozy Studio in Downtown Campus District",
        price: 650,
        location: "Near University Street",
        rooms: 1,
        people: 1,
        size: "35 m²",
        images: ["🏢"],
        amenities: ["WiFi", "Furnished", "Kitchen"],
        description: "Perfect studio apartment for single students. Well-equipped kitchen, modern furniture, and excellent WiFi connection.",
        lat: 48.8566,
        lng: 2.3522
    },
    {
        id: 2,
        title: "Spacious 1-bedroom/2-room Student Apartment",
        price: 890,
        location: "5 min from University Center",
        rooms: 2,
        people: 2,
        size: "45 m²",
        images: ["🏠"],
        amenities: ["WiFi", "Balcony", "Laundry", "Furnished"],
        description: "Great apartment for roommates. Includes a shared living area and private bedrooms. Walking distance to campus.",
        lat: 48.8704,
        lng: 2.3568
    },
    {
        id: 3,
        title: "Modern Studio with City View",
        price: 750,
        location: "Artist Quarter",
        rooms: 1,
        people: 1,
        size: "40 m²",
        images: ["🏘️"],
        amenities: ["WiFi", "Balcony", "Furnished", "Gym Access"],
        description: "Stylish studio with excellent amenities. Perfect for students who value modern design and comfort.",
        lat: 48.8631,
        lng: 2.3889
    },
    {
        id: 4,
        title: "Affordable 2-bedroom Student Housing",
        price: 950,
        location: "East Campus",
        rooms: 2,
        people: 2,
        size: "50 m²",
        images: ["🏙️"],
        amenities: ["WiFi", "Kitchen", "Laundry", "Utilities Included"],
        description: "Budget-friendly option for students. Utilities are included in the rent. Comfortable and practical.",
        lat: 48.8453,
        lng: 2.3699
    },
    {
        id: 5,
        title: "Vibrant Shared Student Flat",
        price: 550,
        location: "Near Student Hub",
        rooms: 1,
        people: 1,
        size: "30 m²",
        images: ["🏢"],
        amenities: ["WiFi", "Common Areas", "Furnished", "Social Activities"],
        description: "Join a vibrant student community! Shared common areas perfect for making friends and studying together.",
        lat: 48.8760,
        lng: 2.3502
    },
    {
        id: 6,
        title: "Luxe Student Residence with Amenities",
        price: 1100,
        location: "Premium Location",
        rooms: 2,
        people: 2,
        size: "60 m²",
        images: ["🏰"],
        amenities: ["WiFi", "Pool", "Gym", "Furnished", "Security"],
        description: "Premium student residence with excellent facilities. Pool, gym, and 24-hour security included.",
        lat: 48.8566,
        lng: 2.2889
    },
    {
        id: 7,
        title: "Cozy 1-bedroom Near Metro",
        price: 700,
        location: "5 min to Metro Station",
        rooms: 1,
        people: 1,
        size: "38 m²",
        images: ["🏠"],
        amenities: ["WiFi", "Pets Allowed", "Furnished", "Storage"],
        description: "Convenient location with easy metro access. Pet-friendly apartment with ample storage space.",
        lat: 48.8402,
        lng: 2.3320
    },
    {
        id: 8,
        title: "Spacious 3-bedroom Student House",
        price: 1200,
        location: "Quiet Residential Area",
        rooms: 3,
        people: 3,
        size: "75 m²",
        images: ["🏘️"],
        amenities: ["WiFi", "Garden", "Furnished", "Utilities", "Parking"],
        description: "Perfect for 3 roommates. Full house with garden and parking. Great for students who want more space.",
        lat: 48.8440,
        lng: 2.3568
    }
];

let currentListings = [...listings];
let currentFilter = 'all';
let favorites = [];
let map = null;
let markers = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    renderListings(listings);
    setupEventListeners();
    loadFavorites();
});

// Initialize map
function initMap() {
    // Create map centered on a university city
    map = L.map('map').setView([48.8566, 2.3522], 12);
    
    // Add map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        maxNativeZoom: 18
    }).addTo(map);

    // Add markers for each listing
    updateMapMarkers(listings);
}

// Update map markers
function updateMapMarkers(listingsToShow) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    listingsToShow.forEach((listing, index) => {
        const marker = L.circleMarker([listing.lat, listing.lng], {
            radius: 10,
            fillColor: '#6c5ce7',
            color: '#5f3dc4',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`
            <div style="font-weight: bold; color: #6c5ce7;">€${listing.price}/month</div>
            <div style="font-size: 0.9rem;">${listing.title}</div>
        `).on('click', function() {
            showListingModal(listing);
        });

        marker.addTo(map);
        markers.push(marker);
    });

    // Fit map bounds to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1), { maxZoom: 14 });
    }
}

// Render listings
function renderListings(listingsToRender) {
    const grid = document.getElementById('listingsGrid');
    grid.innerHTML = '';

    if (listingsToRender.length === 0) {
        grid.innerHTML = '<p style="padding: 2rem; text-align: center; color: #636e72;">No listings found. Try adjusting your filters.</p>';
        return;
    }

    listingsToRender.forEach(listing => {
        const isFavorited = favorites.includes(listing.id);
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <div class="listing-image">
                <div class="listing-image-placeholder">${listing.images[0]}</div>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${listing.id}">
                    ${isFavorited ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="listing-body">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">
                    €${listing.price}
                    <span class="listing-price-period">/month</span>
                </div>
                <div class="listing-specs">
                    <div class="spec-item">
                        <span class="spec-icon">🛏️</span>
                        <span>${listing.rooms} room${listing.rooms > 1 ? 's' : ''}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-icon">👥</span>
                        <span>${listing.people} person</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-icon">📐</span>
                        <span>${listing.size}</span>
                    </div>
                </div>
                <div class="listing-location">
                    📍 ${listing.location}
                </div>
                <div class="listing-amenities">
                    ${listing.amenities.slice(0, 3).map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-btn')) {
                showListingModal(listing);
            }
        });

        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(listing.id, favoriteBtn);
        });

        grid.appendChild(card);
    });

    // Update results count
    document.getElementById('resultsCount').textContent = `${listingsToRender.length} listings found`;
}

// Show listing modal
function showListingModal(listing) {
    const modal = document.getElementById('listingModal');
    const modalBody = document.getElementById('modalBody');
    
    const isFavorited = favorites.includes(listing.id);
    
    modalBody.innerHTML = `
        <div class="modal-listing-image" style="background: linear-gradient(135deg, #f5f6fa 0%, #e0e6ed 100%); display: flex; align-items: center; justify-content: center; font-size: 5rem;">
            ${listing.images[0]}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
                <h2 class="modal-listing-title">${listing.title}</h2>
                <div class="modal-listing-price">€${listing.price}/month</div>
                <div class="listing-location">📍 ${listing.location}</div>
            </div>
            <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${listing.id}">
                ${isFavorited ? '❤️' : '🤍'}
            </button>
        </div>

        <h3 class="modal-section-title">Description</h3>
        <p class="modal-description">${listing.description}</p>

        <h3 class="modal-section-title">Details</h3>
        <div class="modal-specs">
            <div class="modal-spec-item">
                <div class="modal-spec-value">${listing.rooms}</div>
                <div class="modal-spec-label">Bedroom${listing.rooms > 1 ? 's' : ''}</div>
            </div>
            <div class="modal-spec-item">
                <div class="modal-spec-value">${listing.size}</div>
                <div class="modal-spec-label">Size</div>
            </div>
            <div class="modal-spec-item">
                <div class="modal-spec-value">${listing.people}</div>
                <div class="modal-spec-label">Person${listing.people > 1 ? 's' : ''}</div>
            </div>
            <div class="modal-spec-item">
                <div class="modal-spec-value">€${listing.price}</div>
                <div class="modal-spec-label">Monthly</div>
            </div>
        </div>

        <h3 class="modal-section-title">Amenities</h3>
        <div class="modal-amenities">
            ${listing.amenities.map(amenity => `<div class="modal-amenity-item">✓ ${amenity}</div>`).join('')}
        </div>

        <h3 class="modal-section-title">Contact</h3>
        <p class="modal-description">Ready to book? Contact the landlord to schedule a viewing or get more information about this property.</p>
        
        <div class="action-buttons">
            <button class="btn primary">Contact Landlord</button>
            <button class="btn">Schedule Tour</button>
        </div>
    `;

    const favoriteBtn = modalBody.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(listing.id, favoriteBtn);
    });

    modal.classList.add('show');
}

// Toggle favorite
function toggleFavorite(listingId, button) {
    const index = favorites.indexOf(listingId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(listingId);
    }
    
    // Update button appearance
    button.classList.toggle('favorited');
    button.textContent = button.classList.contains('favorited') ? '❤️' : '🤍';
    
    // Save to localStorage
    saveFavorites();
    
    // Update all favorite buttons across the page
    updateFavoriteButtons();
}

// Update all favorite buttons
function updateFavoriteButtons() {
    const buttons = document.querySelectorAll('.favorite-btn');
    buttons.forEach(btn => {
        const id = parseInt(btn.getAttribute('data-id'));
        const isFavorited = favorites.includes(id);
        btn.classList.toggle('favorited', isFavorited);
        btn.textContent = isFavorited ? '❤️' : '🤍';
    });
}

// Save and load favorites
function saveFavorites() {
    localStorage.setItem('studentNestFavorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('studentNestFavorites');
    if (saved) {
        favorites = JSON.parse(saved);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('listingModal').classList.remove('show');
    });

    // Close modal when clicking outside
    document.getElementById('listingModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Date picker
    document.getElementById('moveOutBtn').addEventListener('click', function() {
        // In a real app, this would open a date picker
        alert('Date picker would open here. Currently set to Apr 20, 2026');
    });
}

// Apply filters
function applyFilter(filter) {
    currentFilter = filter;
    let filtered = [...listings];

    switch(filter) {
        case 'price':
            // Sort by price low to high
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'people':
            // Filter for 1-2 people apartments
            filtered = filtered.filter(l => l.people <= 2);
            break;
        case 'amenities':
            // Filter for apartments with 4+ amenities
            filtered = filtered.filter(l => l.amenities.length >= 4);
            break;
        case 'more':
            // For now, show all (in real app would open advanced filters)
            break;
        case 'all':
        default:
            // Show all listings
            break;
    }

    currentListings = filtered;
    renderListings(filtered);
    updateMapMarkers(filtered);
}

// Responsive adjustments
window.addEventListener('resize', function() {
    if (map) {
        setTimeout(() => map.invalidateSize(), 100);
    }
});

// Add some interactivity to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.textContent.toLowerCase() === 'sign in') {
            alert('Sign in functionality would open here');
        }
    });
});

// Add keyboard shortcut to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('listingModal').classList.remove('show');
    }
});
