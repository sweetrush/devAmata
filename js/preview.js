class SitePreview {
    constructor(url, name) {
        this.url = url;
        this.name = name;
        this.modal = null;
        this.currentMode = 'desktop';
    }

    createPreview() {
        // Create modal HTML
        const modalHtml = `
            <div class="modal fade" id="preview-${this.url}" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <img class="me-2" 
                                     src="https://${this.url}/favicon.ico" 
                                     width="16" 
                                     height="16"
                                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>'">
                                <h5 class="modal-title" id="previewModalLabel">${this.name || this.url}</h5>
                            </div>
                            <div class="btn-group me-2" role="group" aria-label="Preview modes">
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
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0" style="height: 500px;">
                            <div id="preview-content-${this.url}" class="preview-content desktop-mode h-100">
                                <div class="loading-spinner position-absolute top-50 start-50 translate-middle">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <iframe 
                                    class="preview-iframe w-100 h-100 border-0"
                                    src="https://${this.url}" 
                                    sandbox="allow-same-origin allow-scripts"
                                    loading="lazy"
                                    onload="currentPreview.hideLoading()"
                                ></iframe>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="me-auto">
                                <span id="status-${this.url}">
                                    <i class="fas fa-globe me-2"></i>Checking status...
                                </span>
                            </div>
                            <a href="https://${this.url}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-external-link-alt me-2"></i>Visit Site
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Get modal instance
        this.modal = new bootstrap.Modal(document.getElementById(`preview-${this.url}`));
        
        // Show modal
        this.modal.show();
        
        // Check site status
        this.checkSiteStatus();
        
        // Add event listener for modal close
        document.getElementById(`preview-${this.url}`).addEventListener('hidden.bs.modal', () => {
            this.destroy();
        });
    }

    hideLoading() {
        const spinner = document.querySelector(`#preview-content-${this.url} .loading-spinner`);
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    async checkSiteStatus() {
        const statusElement = document.getElementById(`status-${this.url}`);
        try {
            const response = await fetch(`https://${this.url}`, { mode: 'no-cors' });
            statusElement.innerHTML = `
                <i class="fas fa-check-circle text-success me-2"></i>Site is online
            `;
        } catch (error) {
            statusElement.innerHTML = `
                <i class="fas fa-exclamation-circle text-warning me-2"></i>Status unavailable
            `;
        }
    }

    setMode(mode) {
        const content = document.getElementById(`preview-content-${this.url}`);
        const buttons = document.querySelectorAll(`#preview-${this.url} .btn-group button`);
        
        // Update buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[mode === 'desktop' ? 0 : mode === 'mobile' ? 1 : 2].classList.add('active');

        // Update content
        content.classList.remove('desktop-mode', 'mobile-mode', 'info-mode');
        content.classList.add(`${mode}-mode`);

        if (mode === 'mobile') {
            content.querySelector('iframe').style.width = '375px';
        } else if (mode === 'desktop') {
            content.querySelector('iframe').style.width = '100%';
        }

        this.currentMode = mode;
    }

    destroy() {
        const modalElement = document.getElementById(`preview-${this.url}`);
        if (modalElement) {
            modalElement.remove();
        }
        currentPreview = null;
    }
}

window.SitePreview = SitePreview;
window.currentPreview = null;