// Main Application Logic
class App {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.init();
    }

    // Initialize the application
    init() {
        this.updateVisitCount();
        this.populateSites();
        this.initializeSearchFilter();
        this.setupEventListeners();
    }

    // Create site link HTML
    createSiteLink(site) {
        return `
            <div class="site-link">
                <a href="https://${site.url}" 
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                   onmouseenter="app.showPreview('${site.url}', '${site.name}', event)"
                   onmouseleave="if(currentPreview) currentPreview.close()"
                   target="_blank">
                    <div>
                        <i class="fas fa-globe me-2"></i>
                        ${site.name}
                        <small class="text-muted ms-2">${site.url}</small>
                        ${site.category ? `<span class="site-category">${site.category}</span>` : ''}
                    </div>
                    <i class="fas fa-external-link-alt text-muted"></i>
                </a>
            </div>
        `;
    }

    // Show preview for a site
    showPreview(url, name, event) {
        if (currentPreview) {
            currentPreview.close();
        }

        const rect = event.target.getBoundingClientRect();
        const x = Math.min(rect.right + 20, window.innerWidth - previewConfig.previewWidth - 20);
        const y = Math.max(10, rect.top + window.scrollY - 100);

        currentPreview = new SitePreview(url, name);
        currentPreview.createPopup(x, y);
    }

    // Populate all site categories
    populateSites() {
        // Populate search engines
        const searchEnginesContainer = document.getElementById('searchEngines');
        searchEnginesContainer.innerHTML = siteData.searchEngines.map(site => 
            this.createSiteLink(site)
        ).join('');
        document.getElementById('searchEngineCount').textContent = siteData.searchEngines.length;

        // Populate government sites
        const govSitesContainer = document.getElementById('govSites');
        govSitesContainer.innerHTML = siteData.govSites.map(site => 
            this.createSiteLink(site)
        ).join('');
        document.getElementById('govSitesCount').textContent = siteData.govSites.length;

        // Populate bank sites
        const bankSitesContainer = document.getElementById('bankSites');
        bankSitesContainer.innerHTML = siteData.bankSites.map(site => 
            this.createSiteLink(site)
        ).join('');
        document.getElementById('banksCount').textContent = siteData.bankSites.length;
    }

    // Initialize search functionality
    initializeSearchFilter() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterSites(searchTerm);
        });
    }

    // Filter sites based on search term
    filterSites(searchTerm) {
        document.querySelectorAll('.site-link').forEach(link => {
            const text = link.textContent.toLowerCase();
            const parent = link.closest('.card');
            const isVisible = text.includes(searchTerm);
            link.style.display = isVisible ? '' : 'none';
            
            // Update category counters
            if (parent) {
                const visibleLinks = parent.querySelectorAll('.site-link[style=""]').length;
                const counter = parent.querySelector('.badge');
                if (counter) {
                    counter.textContent = visibleLinks;
                }
            }
        });
    }

    // Setup global event listeners
    setupEventListeners() {
        // Close preview when clicking outside
        document.addEventListener('click', (e) => {
            if (currentPreview && !e.target.closest('.preview-popup') && !e.target.closest('.site-link')) {
                currentPreview.close();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && currentPreview) {
                currentPreview.close();
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (currentPreview) {
                    currentPreview.close();
                }
            }, 100);
        });
    }

    // Update visit counter
    updateVisitCount() {
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount.toString());
        document.getElementById('visitCount').textContent = this.visitCount;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});