class App {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.siteStatuses = new Map(); // Store site statuses
        this.init();
    }

    // Create site link with status indicator
    createSiteLink(site) {
        const statusId = `status-${site.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        return `
            <div class="site-link">
                <a href="https://${site.url}" 
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                   onclick="app.showPreview('${site.url}', '${site.name}', event); return false;"
                   target="_blank">
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
                </a>
            </div>
        `;
    }

    // Check status for a single site
    async checkSiteStatus(url) {
        const statusId = `status-${url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const statusElement = document.getElementById(statusId);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
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

    // Update the status indicator UI
    updateStatusIndicator(element, isUp) {
        if (!element) return;

        element.innerHTML = isUp ? 
            '<span class="badge bg-success">Up</span>' : 
            '<span class="badge bg-danger">Down</span>';
    }

    // Check all sites' status
    async checkAllSitesStatus() {
        const allSites = [
            ...siteData.searchEngines,
            ...siteData.govSites,
            ...siteData.bankSites
        ];

        // Check status for each site
        for (const site of allSites) {
            await this.checkSiteStatus(site.url);
            // Small delay between checks to prevent overwhelming requests
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Populate all site categories
    populateSites() {
        // Previous population code...
        const searchEnginesContainer = document.getElementById('searchEngines');
        if (searchEnginesContainer) {
            searchEnginesContainer.innerHTML = siteData.searchEngines
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('searchEngineCount', siteData.searchEngines.length);
        }

        const govSitesContainer = document.getElementById('govSites');
        if (govSitesContainer) {
            govSitesContainer.innerHTML = siteData.govSites
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('govSitesCount', siteData.govSites.length);
        }

        const bankSitesContainer = document.getElementById('bankSites');
        if (bankSitesContainer) {
            bankSitesContainer.innerHTML = siteData.bankSites
                .map(site => this.createSiteLink(site))
                .join('');
            this.updateCategoryCount('banksCount', siteData.bankSites.length);
        }

        // Start checking statuses after populating
        this.checkAllSitesStatus();
    }

    // Initialize the application
    init() {
        this.updateVisitCount();
        this.populateSites();
        this.initializeSearchFilter();
        this.setupEventListeners();

        // Add refresh status button
        this.addRefreshStatusButton();
    }

    // Add refresh status button
    addRefreshStatusButton() {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            const refreshButton = document.createElement('button');
            refreshButton.className = 'btn btn-outline-primary ms-2';
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Status';
            refreshButton.onclick = () => this.checkAllSitesStatus();
            
            searchContainer.querySelector('.input-group').after(refreshButton);
        }
    }

    // Rest of the App class methods remain the same...
}

// Add some CSS styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .status-indicator {
            display: inline-flex;
            align-items: center;
        }
        
        .status-indicator .badge {
            font-size: 0.75em;
            padding: 0.25em 0.5em;
        }
        
        .spinner-grow {
            width: 0.5rem;
            height: 0.5rem;
        }
    </style>
`);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});