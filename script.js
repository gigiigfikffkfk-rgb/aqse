document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Update Date and Time
    function updateDateTime() {
        const now = new Date();
        
        // Current Date
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
        }
        
        // Creation Time
        const timeElement = document.getElementById('create-time');
        if (timeElement) {
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            };
            timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
        }
        
        // Current Year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = now.getFullYear();
        }
    }
    
    // Display Website URL
    const siteUrl = document.getElementById('site-url');
    if (siteUrl) {
        siteUrl.textContent = window.location.hostname || "yourusername.github.io";
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Effects
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        // Navbar background on scroll
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
            }
        }
        
        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrolled >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${current}`) {
                anchor.classList.add('active');
            }
        });
    });
    
    // Initial update
    updateDateTime();
    // Update every second
    setInterval(updateDateTime, 1000);
    
    // Add hover effects
    addHoverEffects();
});

// Send Message Function
function sendMessage() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showModal('⚠️ Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showModal('📧 Please enter a valid email address');
        return;
    }
    
    // In real application, you would send data to server here
    // For demo, we'll show success message
    
    const successMessages = [
        `Thank you ${name}! Your message has been sent successfully.`,
        `Message sent ${name}! I'll get back to you soon.`,
        `Great ${name}! Your message is on its way.`,
        `Received your message ${name}. Thanks for reaching out!`
    ];
    
    const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    showModal(randomMessage);
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show Modal
function showModal(message) {
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    
    if (modal && modalMessage) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (modal.style.display === 'flex') {
                closeModal();
            }
        }, 5000);
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('message-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Add Hover Effects
function addHoverEffects() {
    // Button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card effects
    const cards = document.querySelectorAll('.feature-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Console welcome message
console.log('🚀 Website loaded successfully!');
console.log('💻 You can modify this code as you like');
console.log('📁 Files: index.html, style.css, script.js');
console.log('🌐 Your site will be at: https://yourusername.github.io');

// Easter egg - type "help" in console
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        console.log('💡 Tips:');
        console.log('1. Change colors in style.css');
        console.log('2. Edit text in index.html');
        console.log('3. Add your own functions in script.js');
        console.log('4. Upload to GitHub Pages for free hosting!');
    }
});
