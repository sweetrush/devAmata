class App {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.siteStatuses = new Map();
        this.currentPreview = null; // Encapsulate currentPreview within the class
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
            <div class="site-link">
                <button 
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center w-100 border-0 bg-transparent"
                    data-bs-toggle="modal" 
                    data-site-url="${site.url}"
                    data-site-name="${site.name}"
                    onclick="app.showPreview('${site.url}', '${site.name}', event)">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-globe me-2"></i>
                        <div>
                            <div class="d-flex align-items-center">
                                <span class="fw-medium">${site.name}</span>
                                <span id="${statusId}" class="status-indicator ms-2">
                                    <span class="spinner-grow spinner-grow-sm text-secondary" role="status">
                                        <span class="visually-hidden">Checking status...</span>
                                    </span>
                                </span>
                            </div>
                            <small class="text-muted">${site.url}</small>
                        </div>
                        ${site.category ? 
                            `<span class="badge bg-light text-dark ms-2">${site.category}</span>` 
                            : ''}
                    </div>
                    <div class="preview-link">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                </button>
            </div>
        `;
    }

    showPreview(url, name, event) {
        event.preventDefault();
        
        if (this.currentPreview) { // Use this.currentPreview instead of currentPreview
            this.currentPreview.modal.hide();
        }

        this.currentPreview = new SitePreview(url, name);
        this.currentPreview.createPreview();
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
            if (error.name === 'AbortError') {
                console.warn(`Request for ${url} timed out.`);
            } else {
                console.error(`Error checking status for ${url}:`, error);
            }
            this.updateStatusIndicator(statusElement, false);
            this.siteStatuses.set(url, false);
        }
    }

    updateStatusIndicator(element, isUp) {
        if (!element) return;

        element.innerHTML = isUp ? 
            '<span class="badge bg-success">Up</span>' : 
            '<span class="badge bg-danger">Down</span>';
    }

    async checkAllSitesStatus() {
        const allSites = [
            ...siteData.searchEngines,
            ...siteData.govSites,
            ...siteData.bankSites
        ];

        for (const site of allSites) {
            await this.checkSiteStatus(site.url);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    populateSites() {
        const siteList = document.getElementById('siteList');
        if (!siteList) return;
    
        // Clear existing content
        siteList.innerHTML = '';
    
        // Get all categories
        const categories = siteDataHelpers.getCategories();
    
        // Create sections for each category
        categories.forEach(category => {
            const sites = siteDataHelpers.getSitesByCategory(category);
            if (sites.length === 0) return;
    
            const categoryInfo = siteDataHelpers.getCategoryInfo(category);
            
            const section = `
                <div class="category-section mb-4">
                    <div class="category-header">
                        <div>
                            <i class="fas ${categoryInfo.icon} me-2"></i>
                            <span class="fw-bold">${category}</span>
                            <span class="text-muted ms-2">(${sites.length} sites)</span>
                        </div>
                    </div>
                    <div class="site-list-items">
                        ${sites.map(site => this.createSiteLink(site)).join('')}
                    </div>
                </div>
            `;
    
            siteList.insertAdjacentHTML('beforeend', section);
        });
    
        // Update total sites count
        const totalSites = document.getElementById('totalSites');
        if (totalSites) {
            totalSites.textContent = siteDataHelpers.getSiteCount();
        }
    
        // Start checking site statuses
        this.checkAllSitesStatus();
    }
    
    // Update the checkAllSitesStatus method to use the helper function:
    async checkAllSitesStatus() {
        const allSites = siteDataHelpers.getAllSites();
        
        for (const site of allSites) {
            await this.checkSiteStatus(site.url);
            // Add a small delay between checks to prevent overwhelming servers
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    updateCategoryCount(elementId, count) {
        const countElement = document.getElementById(elementId);
        if (countElement) {
            countElement.textContent = count;
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
        document.querySelectorAll('.site-link').forEach(link => {
            const text = link.textContent.toLowerCase();
            const parent = link.closest('.card');
            const isVisible = text.includes(searchTerm);
            
            link.style.display = isVisible ? '' : 'none';
            
            if (parent) {
                const visibleLinks = parent.querySelectorAll('.site-link:not([style="display: none"])').length; // Corrected logic
                const counter = parent.querySelector('.badge');
                if (counter) {
                    counter.textContent = visibleLinks;
                }
            }
        });

        this.updateSearchResults(searchTerm);
    }

    updateSearchResults(searchTerm) {
        const noResults = document.getElementById('noResults');
        if (noResults) {
            const totalVisible = document.querySelectorAll('.site-link:not([style="display: none"])').length; // Corrected logic
            const totalSites = document.querySelectorAll('.site-link').length;
            
            if (searchTerm && totalVisible === 0 && totalSites > 0) {
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
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPreview) { // Use this.currentPreview instead of currentPreview
                this.currentPreview.modal.hide();
            }
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.currentPreview) { // Use this.currentPreview instead of currentPreview
                    this.currentPreview.adjustSize();
                }
            }, 100);
        });
    }

    addRefreshStatusButton() {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            const refreshButton = document.createElement('button');
            refreshButton.className = 'btn btn-outline-primary ms-2';
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Status';
            refreshButton.onclick = () => this.checkAllSitesStatus();
            
            const inputGroup = searchContainer.querySelector('.input-group');
            if (inputGroup) {
                inputGroup.parentNode.insertBefore(refreshButton, inputGroup.nextSibling);
            }
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

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
