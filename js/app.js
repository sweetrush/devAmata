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

        this.checkAllSitesStatus();
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
                const visibleLinks = parent.querySelectorAll('.site-link[style="display: none"]').length;
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
            const totalVisible = document.querySelectorAll('.site-link[style="display: none"]').length;
            
            if (searchTerm && totalVisible === 0) {
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
            if (e.key === 'Escape' && currentPreview) {
                currentPreview.modal.hide();
            }
        });

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