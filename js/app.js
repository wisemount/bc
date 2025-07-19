/**
 * BC - Additional JavaScript Functionality
 * This file contains optional enhancements for your BC website
 */

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollTo: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// ===== ANALYTICS TRACKING =====
const analytics = {
    // Track button clicks
    trackClick: (category, action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    },
    
    // Track scroll depth
    trackScrollDepth: () => {
        const scrollDepths = [25, 50, 75, 100];
        const trackedDepths = new Set();
        
        const trackDepth = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    analytics.trackClick('Scroll', 'scroll_depth', `${depth}%`);
                }
            });
        };
        
        window.addEventListener('scroll', utils.debounce(trackDepth, 250));
    },
    
    // Track time on page
    trackTimeOnPage: () => {
        const startTime = Date.now();
        const intervals = [30, 60, 120, 300]; // seconds
        const tracked = new Set();
        
        setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
            intervals.forEach(interval => {
                if (timeOnPage >= interval && !tracked.has(interval)) {
                    tracked.add(interval);
                    analytics.trackClick('Engagement', 'time_on_page', `${interval}s`);
                }
            });
        }, 10000); // Check every 10 seconds
    }
};

// ===== CONTACT FORM HANDLER =====
const contactForm = {
    // Simple contact form submission (requires backend)
    handleSubmit: (formElement) => {
        formElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(formElement);
            const submitButton = formElement.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            
            try {
                // Replace with your form submission endpoint
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Success
                    submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
                    submitButton.classList.remove('btn-primary');
                    submitButton.classList.add('btn-success');
                    formElement.reset();
                    
                    // Track successful submission
                    analytics.trackClick('Contact', 'form_submit', 'success');
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Error';
                submitButton.classList.remove('btn-primary');
                submitButton.classList.add('btn-danger');
                
                // Track failed submission
                analytics.trackClick('Contact', 'form_submit', 'error');
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('btn-success', 'btn-danger');
                submitButton.classList.add('btn-primary');
            }, 3000);
        });
    }
};

// ===== NEWSLETTER SUBSCRIPTION =====
const newsletter = {
    // Handle newsletter subscription
    subscribe: async (email) => {
        try {
            // Replace with your newsletter API endpoint
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                analytics.trackClick('Newsletter', 'subscribe', 'success');
                return { success: true, message: 'Successfully subscribed!' };
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            analytics.trackClick('Newsletter', 'subscribe', 'error');
            return { success: false, message: 'Subscription failed. Please try again.' };
        }
    },
    
    // Setup newsletter form
    setupForm: () => {
        const newsletterForm = document.querySelector('#newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                const result = await newsletter.subscribe(email);
                
                // Show result message
                const messageDiv = document.createElement('div');
                messageDiv.className = `alert alert-${result.success ? 'success' : 'danger'} mt-3`;
                messageDiv.textContent = result.message;
                newsletterForm.appendChild(messageDiv);
                
                setTimeout(() => messageDiv.remove(), 5000);
                
                if (result.success) {
                    newsletterForm.reset();
                }
            });
        }
    }
};

// ===== COPY TO CLIPBOARD =====
const clipboard = {
    copy: async (text, button) => {
        try {
            await navigator.clipboard.writeText(text);
            
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
            button.classList.add('btn-success');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('btn-success');
            }, 2000);
            
            analytics.trackClick('Interaction', 'copy_text', 'success');
        } catch (error) {
            console.error('Failed to copy text:', error);
            analytics.trackClick('Interaction', 'copy_text', 'error');
        }
    },
    
    setupButtons: () => {
        document.querySelectorAll('[data-copy]').forEach(button => {
            button.addEventListener('click', () => {
                const textToCopy = button.dataset.copy;
                clipboard.copy(textToCopy, button);
            });
        });
    }
};

// ===== LAZY LOADING =====
const lazyLoading = {
    images: () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// ===== THEME PERSISTENCE =====
const theme = {
    save: (themeName) => {
        localStorage.setItem('bc-theme', themeName);
    },
    
    load: () => {
        return localStorage.getItem('bc-theme') || 'light';
    },
    
    apply: (themeName) => {
        document.documentElement.setAttribute('data-theme', themeName);
        theme.save(themeName);
    }
};

// ===== PERFORMANCE MONITORING =====
const performance = {
    // Monitor Core Web Vitals
    measureWebVitals: () => {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            analytics.trackClick('Performance', 'LCP', Math.round(lastEntry.startTime));
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            analytics.trackClick('Performance', 'FID', Math.round(firstInput.processingStart - firstInput.startTime));
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    analytics.trackClick('Performance', 'CLS', Math.round(clsValue * 1000));
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize analytics tracking
    if (typeof gtag !== 'undefined') {
        analytics.trackScrollDepth();
        analytics.trackTimeOnPage();
    }
    
    // Initialize other features
    newsletter.setupForm();
    clipboard.setupButtons();
    lazyLoading.images();
    
    // Performance monitoring (only in production)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        performance.measureWebVitals();
    }
    
    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            analytics.trackClick('External Link', 'click', link.href);
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const platform = Array.from(icon.classList).find(cls => cls !== 'social-icon');
            analytics.trackClick('Social Media', 'click', platform);
        });
    });
    
    // Track contact method usage
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const method = Array.from(btn.classList).find(cls => ['email', 'whatsapp', 'phone'].includes(cls));
            analytics.trackClick('Contact', 'click', method);
        });
    });
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        analytics,
        contactForm,
        newsletter,
        clipboard,
        lazyLoading,
        theme,
        performance
    };
}
