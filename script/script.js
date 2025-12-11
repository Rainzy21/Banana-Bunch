// Data Menu untuk Best Seller (Infinite Scroll di Landing Page)
const bestSellerItems = [
    { image: '/assets/PC.jpg', title: 'Pisang Coklat', description: 'Pisang dengan lelehan coklat.', price: 'Rp 18.000', isBestSeller: true },
    { image: '/assets/PG.jpg', title: 'Pisang Gembung', description: 'Krispi di luar, lembut di dalam.', price: 'Rp 18.000', isBestSeller: true },
    { image: '/assets/PN.jpg', title: 'Pisang Nugget', description: 'Pisang renyah dan manis.', price: 'Rp 15.000', isBestSeller: false },
    { image: '/assets/PKL.jpg', title: 'Pisang Keju Lumer', description: 'Crispy diluar, meleleh di dalam.', price: 'Rp 18.000', isBestSeller: false },
    { image: '/assets/UC.jpg', title: 'Ubi Coklat', description: 'Crispy dan bagian dalam lembut.', price: 'Rp 18.000', isBestSeller: false }
];



// --- FUNGSI UTILITY MENU ---

function createMenuCard(item) {
    return `
        <div class="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] border border-green-100 overflow-hidden">
            <div class="relative">
                <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover rounded-t-xl">
                ${item.isBestSeller ? '<span class="absolute top-2 left-2 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-md">⭐ Best Seller</span>' : ''}
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">${item.title}</h3>
                <p class="text-sm text-gray-500 mt-1 h-10 overflow-hidden">${item.description}</p>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-xl font-bold text-green-600">${item.price}</span>
                    <button class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition duration-300">Pesan</button>
                </div>
            </div>
        </div>
    `;
}

function createFullMenuCard(item) {
    return `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] border border-green-100 overflow-hidden">
            <div class="relative">
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                ${item.isBestSeller ? '<span class="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-md">⭐ Best Seller</span>' : ''}
            </div>
            <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-900">${item.title}</h3>
                <p class="text-sm text-gray-500 mt-1">${item.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-2xl font-bold text-green-600">${item.price}</span>
                    <button class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition duration-300">Pesan Sekarang</button>
                </div>
            </div>
        </div>
    `;
}

function initializeLandingPageMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    function renderMenu(items, count) {
        menuContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            items.forEach(item => {
                menuContainer.innerHTML += createMenuCard(item);
            });
        }
    }
    renderMenu(bestSellerItems, 10);
    
    // Logika Auto Scroll (Opsional)
    let scrollSpeed = 0.5;
    function autoScroll() {
        if (menuContainer.scrollLeft >= menuContainer.scrollWidth / 2) {
            menuContainer.scrollLeft = menuContainer.scrollWidth / 4; 
        }
        menuContainer.scrollLeft += scrollSpeed;
        requestAnimationFrame(autoScroll);
    }
    // autoScroll(); // Uncomment ini jika ingin menu bergerak otomatis
}

function initializeFullMenuPage() {
    const fullMenuContainer = document.getElementById('full-menu-container');
    if (!fullMenuContainer) return;

    fullMenuContainer.innerHTML = '';
    allMenuItems.forEach(item => {
        fullMenuContainer.innerHTML += createFullMenuCard(item);
    });
}


// --- FUNGSI NAVIGASI SPA ---

const PAGES = {
    'home': 'landing-page-container',
    'about': 'landing-page-container', 
    'menu': 'landing-page-container',
    'review': 'landing-page-container',
    'contact': 'landing-page-container',
    // Halaman Penuh
    'all-menu': 'menu-page',
    'about-umkm': 'umkm-page',
    'developer': 'developer-page'
};

function navigateTo(hash) {
    // Sembunyikan semua konten halaman
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });

    const cleanHash = hash.split('-')[0] || 'home';
    const targetId = PAGES[cleanHash] || PAGES['home'];
    const targetElement = document.getElementById(targetId);
    
    // 1. Jika tujuannya Landing Page Container, tampilkan dan scroll ke section
    if (targetId === 'landing-page-container') {
        const sectionId = cleanHash;
        const sectionElement = document.getElementById(sectionId);
        
        document.getElementById('landing-page-container').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'auto' }); // Scroll ke atas container dulu

        if (sectionElement) {
            // Gulir ke section yang diminta setelah container ditampilkan
            setTimeout(() => {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }, 10); // Jeda kecil untuk memastikan DOM sudah dirender
        }
    } 
    // 2. Jika tujuannya Halaman Penuh, tampilkan halaman itu dan scroll ke atas
    else if (targetElement) {
        targetElement.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function handleHashChange() {
    let hash = window.location.hash.substring(1) || 'home';
    // Menggunakan seluruh hash (misalnya: #menu) untuk navigateTo
    navigateTo(hash);
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Konten
    initializeLandingPageMenu();
    initializeFullMenuPage();

    // 2. Mobile Menu Toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // 3. Parallax Scroll Effect
    window.addEventListener('scroll', function() {
        const parallax = document.getElementById('parallax');
        const isLandingPage = document.getElementById('landing-page-container').style.display !== 'none';
        
        if (parallax && isLandingPage) {
            let offset = window.pageYOffset;
            parallax.style.backgroundPositionY = (offset * 0.5) + 'px';
        }
    });

    // 4. Navigasi SPA
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle klik pada semua tautan navigasi
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            document.getElementById('mobile-menu').classList.add('hidden'); // Tutup menu mobile
        });
    });

    // Panggil navigasi saat halaman pertama dimuat
    handleHashChange();
});

document.querySelectorAll(".dev-card").forEach(card => {
    const img = card.querySelector(".profile-img");
    const ring = card.querySelector(".profile-ring");

    card.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.08)";
        ring.classList.remove("ring-[#782626]");
        ring.classList.add("ring-[#D64028]");
    });

    card.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
        ring.classList.add("ring-[#782626]");
        ring.classList.remove("ring-[#D64028]");
    });
});

