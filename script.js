// Seamless Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const headerNav = document.getElementById('headerNav');
const navMenus = [navLinks, headerNav].filter(el => el !== null);

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenus.forEach(menu => {
      menu.classList.toggle('active');
    });
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a, #headerNav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenus.forEach(menu => {
        menu.classList.remove('active');
      });
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navbar') || document.querySelector('header');
    if (nav && !nav.contains(e.target) && menuToggle.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenus.forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });
}

// Detect if device is mobile
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Improve touch interactions for mobile
if (isMobileDevice()) {
  document.documentElement.classList.add('mobile-device');
  
  // Add touch event listeners to buttons
  document.querySelectorAll('button, a[class*="btn"], .cta-buttons a').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.opacity = '0.8';
    });
    element.addEventListener('touchend', function() {
      this.style.opacity = '1';
    });
  });
}

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Set active class to the current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// Advanced Intersection Observer for smooth fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in effect to cards on load
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.video-card, .gallery-item, .stat-card, .folder-container');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Handle local video uploads
document.querySelectorAll('.video-upload').forEach(input => {
  input.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoContainer = this.closest('.video-container');
      const videoPlayer = videoContainer.querySelector('.video-player');
      const uploadBtn = videoContainer.querySelector('.upload-btn');
      const videoStatus = this.closest('.video-card').querySelector('.video-status');
      
      // Create a URL for the uploaded file
      const videoURL = URL.createObjectURL(file);
      
      // Update video source
      const sourceElement = videoPlayer.querySelector('source');
      sourceElement.src = videoURL;
      videoPlayer.load();
      
      // Show video player, hide upload button
      videoPlayer.style.display = 'block';
      uploadBtn.style.display = 'none';
      videoStatus.textContent = 'Video uploaded: ' + file.name;
      videoStatus.style.color = '#4ade80';
    } else {
      alert('Please select a valid video file');
    }
  });
});

// Add click animation to buttons
document.querySelectorAll('.upload-btn, .cta-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Detect dark/light mode preference
function detectTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark-mode');
  }
}

detectTheme();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// Add smooth hover effect to cards
document.querySelectorAll('.video-card, .gallery-item, .stat-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Scroll to top button functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'scale(1)';
});

console.log('Portfolio page loaded successfully!');
