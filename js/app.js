class App {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.siteStatuses = new Map();
        this.init();
    }

    init() {
        this.updateVisitCount();
        this.populateSites();
        this.initializeSearchFilter();
        this.setupEventListeners();
        this.addRefreshStatusButton();
    }

    createSiteLink(site) {
        const statusId = `status-${site.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        return `
            <div class="site-item">
                <div class="site-link">
                    <button 
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center w-100 border-0 bg-transparent"
                        onclick="app.showPreview('${site.url}', '${site.name}', event)">
                        <div class="d-flex align-items-center">
                            <img 
                                class="site-favicon" 
                                src="https://${site.url}/favicon.ico" 
                                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>'; this.classList.add('fallback')"
                                alt=""
                            >
                            <div class="site-info">
                                <div class="site-name">${site.name}</div>
                                <div class="site-url">${site.url}</div>
                            </div>
                        </div>
                        <div class="site-details">
                            <span id="${statusId}" class="status-badge status-checking">
                                Checking...
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }

    populateSites() {
        const siteList = document.getElementById('siteList');
        if (!siteList) return;

        // Clear existing content
        siteList.innerHTML = '';
        let totalSites = 0;

        // Iterate through each category in siteData
        Object.entries(siteData).forEach(([categoryKey, sites]) => {
            if (!sites || sites.length === 0) return;

            // Format the category name (e.g., 'govSites' -> 'Government')
            const categoryName = categoryKey
                .replace('Sites', '')
                .replace(/([A-Z])/g, ' $1')
                .trim();

            const section = `
                <div class="category-section mb-4">
                    <div class="category-header">
                        <div>
                            <i class="fas ${this.getCategoryIcon(categoryName)} me-2"></i>
                            <span class="fw-bold">${categoryName}</span>
                            <span class="text-muted ms-2">(${sites.length} sites)</span>
                        </div>
                    </div>
                    <div class="site-list-items">
                        ${sites.map(site => this.createSiteLink(site)).join('')}
                    </div>
                </div>
            `;

            siteList.insertAdjacentHTML('beforeend', section);
            totalSites += sites.length;
        });

        // Update total sites count
        const totalSitesElement = document.getElementById('totalSites');
        if (totalSitesElement) {
            totalSitesElement.textContent = totalSites;
        }

        // Start checking site statuses
        this.checkAllSitesStatus();
    }

    getCategoryIcon(category) {
        const iconMap = {
            'Government': 'fa-landmark',
            'Bank': 'fa-university',
            'Education': 'fa-graduation-cap',
            'Business': 'fa-briefcase',
            'Tourism': 'fa-umbrella-beach',
            'Utility': 'fa-bolt',
            'Media': 'fa-newspaper',
            'Sports': 'fa-futbol',
            'Health': 'fa-hospital',
            'Telecom': 'fa-phone',
            'ISP': 'fa-wifi'
        };
        return iconMap[category] || 'fa-globe';
    }

    showPreview(url, name, event) {
        event.preventDefault();
        
        if (currentPreview) {
            currentPreview.modal.hide();
        }

        currentPreview = new SitePreview(url, name);
        currentPreview.createPreview();
        this.trackPreview(url);
    }

    async checkSiteStatus(url) {
        const statusId = `status-${url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const statusElement = document.getElementById(statusId);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(`https://${url}`, { 
                mode: 'no-cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            this.updateStatusIndicator(statusElement, true);
            this.siteStatuses.set(url, true);
        } catch (error) {
            this.updateStatusIndicator(statusElement, false);
            this.siteStatuses.set(url, false);
        }
    }

    updateStatusIndicator(element, isUp) {
        if (!element) return;
        
        element.className = `status-badge ${isUp ? 'status-up' : 'status-down'}`;
        element.textContent = isUp ? 'Up' : 'Down';
    }

    async checkAllSitesStatus() {
        // Flatten all sites from all categories
        const allSites = Object.values(siteData).flat();
        
        for (const site of allSites) {
            await this.checkSiteStatus(site.url);
            // Add a small delay between checks to prevent overwhelming servers
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    initializeSearchFilter() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.filterSites(searchTerm);
            });
        }
    }

    filterSites(searchTerm) {
        const allSites = document.querySelectorAll('.site-item');
        const noResults = document.getElementById('noResults');
        let hasVisibleSites = false;

        allSites.forEach(siteItem => {
            const text = siteItem.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);
            siteItem.style.display = isVisible ? '' : 'none';
            if (isVisible) hasVisibleSites = true;
        });

        // Show/hide category sections based on whether they have visible sites
        document.querySelectorAll('.category-section').forEach(section => {
            const hasVisibleSites = Array.from(section.querySelectorAll('.site-item'))
                .some(item => item.style.display !== 'none');
            section.style.display = hasVisibleSites ? '' : 'none';
        });

        // Show/hide no results message
        if (noResults) {
            if (searchTerm && !hasVisibleSites) {
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

    setupEventListeners() {
        // Close preview with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && currentPreview) {
                currentPreview.modal.hide();
            }
        });

        // Handle window resize for preview
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (currentPreview) {
                    currentPreview.adjustSize();
                }
            }, 100);
        });
    }

    addRefreshStatusButton() {
        const refreshButton = document.getElementById('refreshStatus');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                this.checkAllSitesStatus();
            });
        }
    }

    updateVisitCount() {
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount.toString());
        
        const visitCountElement = document.getElementById('visitCount');
        if (visitCountElement) {
            visitCountElement.textContent = this.visitCount;
        }
    }

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
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});