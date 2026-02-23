// --- Konfigurasi Nomor WhatsApp ---
const phoneNumber = "6285117244832"; // GANTI DENGAN NOMOR WA ANDA (Format: 628xxx)

// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Cek preferensi awal
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

// Event Listener Toggle
themeToggleBtn.addEventListener('click', function() {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById('menu-toggle');
const navbarSticky = document.getElementById('navbar-sticky');

menuToggle.addEventListener('click', () => {
    navbarSticky.classList.toggle('hidden');
});

// Tutup menu saat link diklik (Mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (!navbarSticky.classList.contains('hidden') && window.innerWidth < 768) {
            navbarSticky.classList.add('hidden');
        }
    });
});

// --- Scroll Animation (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Khusus untuk animasi skill progress bar
            if (entry.target.querySelector('.skill-progress')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
            
            observer.unobserve(entry.target); // Hanya animasi sekali
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// --- Form ke WhatsApp ---
function redirectToWA() {
    const message = "Halo, saya tertarik untuk bekerja sama dengan Anda.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert("Mohon lengkapi semua field.");
        return;
    }

    // Format pesan WhatsApp
    const whatsappMessage = `*Halo, saya ingin menghubungi Anda dari Website Portofolio.*\n\n*Nama:* ${name}\n*Email:* ${email}\n*Pesan:*\n${message}`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Reset form dan buka WA
    contactForm.reset();
    window.open(url, '_blank');
});