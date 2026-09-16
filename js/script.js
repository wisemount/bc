/**
 * WiseMount Pvt Ltd - Official Digital Business Card Scripts
 * Features: Dark/Light Mode, Interactive 3D Card Flip, Dynamic vCard (.vcf), 
 * Web Share API, QR Code Modal, Card Modal, Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCardFlip();
  initModals();
  initSmoothScroll();
  initCopyAndShare();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('wm_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('wm_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
    icon.setAttribute('title', 'Switch to Dark Mode');
  } else {
    icon.className = 'fas fa-sun';
    icon.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   2. Interactive Card 3D Flip
   ========================================================================== */
function initCardFlip() {
  const cardContainer = document.getElementById('heroCardContainer');
  if (!cardContainer) return;

  cardContainer.addEventListener('click', () => {
    cardContainer.classList.toggle('flipped');
  });
}

/* ==========================================================================
   3. Modals (Card Fullview & QR Code)
   ========================================================================== */
function initModals() {
  // Open Card Modal
  const viewCardBtns = document.querySelectorAll('[data-action="view-card"]');
  const cardModal = document.getElementById('cardModal');
  
  viewCardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cardModal) cardModal.classList.add('active');
    });
  });

  // Open QR Modal
  const viewQrBtns = document.querySelectorAll('[data-action="view-qr"]');
  const qrModal = document.getElementById('qrModal');

  viewQrBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (qrModal) qrModal.classList.add('active');
    });
  });

  // Close modals on close button or outside click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });
}

/* ==========================================================================
   4. Native Share & Copy Link
   ========================================================================== */
function initCopyAndShare() {
  const shareBtns = document.querySelectorAll('[data-action="share"]');

  shareBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: 'WiseMount Pvt Ltd | Digital Business Card',
        text: 'WiseMount Pvt Ltd — Digital Business. Intelligently Connected. Official Digital Identity & Business Solutions.',
        url: window.location.href || 'https://bc.wisemount.in/'
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          showToast('Card shared successfully!');
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(shareData.url);
          }
        }
      } else {
        copyToClipboard(shareData.url);
      }
    });
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Link copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy link.');
  });
}

/* ==========================================================================
   5. Dynamic vCard (.vcf) Generator & Downloader (Company Corporate vCard)
   ========================================================================== */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:WiseMount Pvt Ltd',
    'ORG:WiseMount Pvt Ltd;',
    'TITLE:Corporate Technology Solutions & Digital Platforms',
    'TEL;TYPE=WORK,VOICE:+919500027086',
    'TEL;TYPE=CELL,VOICE:+918939677189',
    'EMAIL;TYPE=PREF,INTERNET:wisemount@outlook.com',
    'EMAIL;TYPE=WORK,INTERNET:contact@wisemount.in',
    'URL;TYPE=WORK:https://bc.wisemount.in',
    'URL;TYPE=COMPANY:https://wisemount.in',
    'ADR;TYPE=WORK:;;247/12-1 A, Railway Extension Road;Tenkasi;Tamil Nadu;627811;India',
    'NOTE:Digital Business. Intelligently Connected. Practical digital solutions across AI, Automation, Healthcare, Cloud, and Multi-Vertical Technology.',
    'REV:' + new Date().toISOString(),
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'WiseMount_Pvt_Ltd.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('WiseMount contact card (.vcf) downloaded!');
}

/* ==========================================================================
   6. Download QR Code
   ========================================================================== */
function downloadQRCode() {
  const qrImage = document.querySelector('#qrModal .qr-code-img') || document.querySelector('.contact-qr-panel .qr-code-img');
  if (!qrImage) return;

  const link = document.createElement('a');
  link.href = qrImage.src;
  link.download = 'WiseMount_Digital_Business_Card_QR.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('QR code downloaded!');
}

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('wmToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wmToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   8. Smooth Scroll and Active Navigation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}
