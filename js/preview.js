class SitePreview {
    constructor(url, name) {
        this.url = url;
        this.name = name;
        this.modal = null;
        this.currentMode = 'desktop';
    }

    createPreview() {
        // Create unique ID for the modal
        const modalId = `preview-${this.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        // Create modal HTML
        const modalHtml = `
            <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <img class="me-2" 
                                     src="https://${this.url}/favicon.ico" 
                                     width="16" 
                                     height="16"
                                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>'">
                                <h5 class="modal-title mb-0">${this.name || this.url}</h5>
                            </div>
                            <div class="ms-auto me-2">
                                <div class="btn-group" role="group" aria-label="Preview modes">
                                    <button type="button" class="btn btn-outline-secondary active" onclick="currentPreview.setMode('desktop')">
                                        <i class="fas fa-desktop"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" onclick="currentPreview.setMode('mobile')">
                                        <i class="fas fa-mobile-alt"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" onclick="currentPreview.setMode('info')">
                                        <i class="fas fa-info-circle"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div id="preview-content-${modalId}" class="preview-content desktop-mode" style="height: 500px;">
                                <div class="loading-overlay">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <iframe 
                                    class="preview-iframe w-100 h-100 border-0"
                                    src="https://${this.url}" 
                                    sandbox="allow-same-origin allow-scripts"
                                    loading="lazy"
                                    onload="currentPreview.hideLoading('${modalId}')"
                                ></iframe>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="me-auto">
                                <span id="status-${modalId}" class="text-muted">
                                    <i class="fas fa-circle-notch fa-spin me-2"></i>
                                    Checking site status...
                                </span>
                            </div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="https://${this.url}" class="btn btn-primary" target="_blank">
                                Visit Site
                                <i class="fas fa-external-link-alt ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Initialize Bootstrap modal
        const modalElement = document.getElementById(modalId);
        this.modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });
        
        // Add event listener for modal closing
        modalElement.addEventListener('hidden.bs.modal', () => {
            this.destroy(modalId);
        });

        // Show modal
        this.modal.show();
        
        // Check site status
        this.checkSiteStatus(modalId);
    }

    hideLoading(modalId) {
        const loadingOverlay = document.querySelector(`#preview-content-${modalId} .loading-overlay`);
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    async checkSiteStatus(modalId) {
        const statusElement = document.getElementById(`status-${modalId}`);
        try {
            const response = await fetch(`https://${this.url}`, { mode: 'no-cors' });
            statusElement.innerHTML = `
                <i class="fas fa-check-circle text-success me-2"></i>
                Site is online
            `;
        } catch (error) {
            statusElement.innerHTML = `
                <i class="fas fa-exclamation-circle text-warning me-2"></i>
                Status unavailable
            `;
        }
    }

    setMode(mode) {
        const modalId = `preview-${this.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const content = document.getElementById(`preview-content-${modalId}`);
        const buttons = content.closest('.modal').querySelectorAll('.btn-group button');
        
        // Update buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[mode === 'desktop' ? 0 : mode === 'mobile' ? 1 : 2].classList.add('active');

        // Update content
        content.className = `preview-content ${mode}-mode`;
        const iframe = content.querySelector('iframe');

        switch(mode) {
            case 'mobile':
                iframe.style.width = '375px';
                iframe.style.margin = '0 auto';
                iframe.style.display = 'block';
                break;
            case 'desktop':
                iframe.style.width = '100%';
                iframe.style.margin = '0';
                break;
            case 'info':
                this.showSiteInfo(modalId);
                break;
        }

        this.currentMode = mode;
    }

    showSiteInfo(modalId) {
        const content = document.getElementById(`preview-content-${modalId}`);
        content.innerHTML = `
            <div class="p-4">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">
                                    <i class="fas fa-link me-2"></i>Website URL
                                </h6>
                                <p class="card-text">${this.url}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">
                                    <i class="fas fa-info-circle me-2"></i>Site Information
                                </h6>
                                <p class="card-text">Preview mode shows basic information about the website.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    destroy(modalId) {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            modalElement.remove();
        }
        currentPreview = null;
    }
}

// Add styles for preview modes
const styles = `
    .preview-content {
        position: relative;
        transition: all 0.3s ease-in-out;
    }

    .preview-content.mobile-mode iframe {
        border: 12px solid #333 !important;
        border-radius: 32px;
        transition: all 0.3s ease-in-out;
    }

    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
`;

// Add styles to document
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

// Export for global use
window.SitePreview = SitePreview;
window.currentPreview = null;