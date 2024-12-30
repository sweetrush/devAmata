// Main Application Class
class App {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.currentPreview = null;
        this.init();
    }

    // Initialize the application
    init() {
        this.updateVisitCount();
        this.populateSites();
        this.initializeSearchFilter();
        this.setupEventListeners();
    }

    // Create site link with preview functionality
    createSiteLink(site) {
        return `
            <div class="site-link">
                <a href="https://${site.url}" 
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                   onclick="app.showPreview('${site.url}', '${site.name}', event); return false;"
                   target="_blank">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-globe me-2"></i>
                        <div>
                            <div class="fw-medium">${site.name}</div>
                            <small class="text-muted">${site.url}</small>
                        </div>
                        ${site.category ? 
                            `<span class="badge bg-light text-dark ms-2">${site.category}</span>` 
                            : ''}
                    </div>
                    <div class="preview-link">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                </a>
            </div>
        `;
    }

    // Show site preview modal
    showPreview(url, name, event) {
        event.preventDefault();
        
        // Close existing preview if open
        if (currentPreview) {
            currentPreview.modal.hide();
        }

        // Create and show new preview
        currentPreview = new SitePreview(url, name);
        currentPreview.createPreview();

        // Track preview in analytics
        this.trackPreview(url);
    }

    // Populate all site categories
    populateSites() {
        // Populate search engines
        const searchEnginesContainer = document.getElementById('searchEngines');
        if (searchEnginesContainer) {
            searchEnginesContainer.innerHTML = siteData.searchEngines
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('searchEngineCount', siteData.searchEngines.length);
        }

        // Populate government sites
        const govSitesContainer = document.getElementById('govSites');
        if (govSitesContainer) {
            govSitesContainer.innerHTML = siteData.govSites
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('govSitesCount', siteData.govSites.length);
        }

        // Populate bank sites
        const bankSitesContainer = document.getElementById('bankSites');
        if (bankSitesContainer) {
            bankSitesContainer.innerHTML = siteData.bankSites
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('banksCount', siteData.bankSites.length);
        }
    }

    // Update category counter
    updateCategoryCount(elementId, count) {
        const countElement = document.getElementById(elementId);
        if (countElement) {
            countElement.textContent = count;
        }
    }

    // Initialize search functionality
    initializeSearchFilter() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.filterSites(searchTerm);
            });

            // Add clear search button functionality
            const clearSearch = document.getElementById('clearSearch');
            if (clearSearch) {
                clearSearch.addEventListener('click', () => {
                    searchInput.value = '';
                    this.filterSites('');
                });
            }
        }
    }

    // Filter sites based on search term
    filterSites(searchTerm) {
        document.querySelectorAll('.site-link').forEach(link => {
            const text = link.textContent.toLowerCase();
            const parent = link.closest('.card');
            const isVisible = text.includes(searchTerm);
            
            // Toggle visibility with animation
            link.style.display = isVisible ? '' : 'none';
            if (isVisible) {
                link.style.opacity = '1';
            } else {
                link.style.opacity = '0';
            }
            
            // Update category counters
            if (parent) {
                const visibleLinks = parent.querySelectorAll('.site-link[style="display: none"]').length;
                const counter = parent.querySelector('.badge');
                if (counter) {
                    counter.textContent = visibleLinks;
                }
            }
        });

        // Update UI based on search results
        this.updateSearchResults(searchTerm);
    }

    // Update UI for search results
    updateSearchResults(searchTerm) {
        const noResults = document.getElementById('noResults');
        const visibleSites = document.querySelectorAll('.site-link[style="display: none"]').length;

        if (noResults) {
            if (searchTerm && visibleSites === 0) {
                noResults.classList.remove('d-none');
                noResults.innerHTML = `
                    <div class="alert alert-info">
                        <i class="fas fa-search me-2"></i>
                        No sites found matching "${searchTerm}"
                    </div>
                `;
            } else {
                noResults.classList.add('d-none');
            }
        }
    }

    // Setup global event listeners
    setupEventListeners() {
        // Handle escape key to close preview
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && currentPreview) {
                currentPreview.modal.hide();
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (currentPreview) {
                    currentPreview.adjustSize();
                }
            }, 100);
        });

        // Track errors
        window.addEventListener('error', (e) => {
            console.error('Application error:', e);
            this.trackError(e);
        });
    }

    // Update visit counter
    updateVisitCount() {
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount.toString());
        
        const visitCountElement = document.getElementById('visitCount');
        if (visitCountElement) {
            visitCountElement.textContent = this.visitCount;
        }
    }

    // Analytics tracking
    trackPreview(url) {
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'preview_site', {
                    'event_category': 'Engagement',
                    'event_label': url
                });
            }
        } catch (e) {
            console.warn('Analytics not available');
        }
    }

    // Error tracking
    trackError(error) {
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'error', {
                    'event_category': 'Error',
                    'event_label': error.message
                });
            }
        } catch (e) {
            console.warn('Analytics not available');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});