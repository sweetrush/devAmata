class SitePreview {
    constructor(url, name) {
        this.url = url;
        this.name = name;
        this.popup = null;
        this.scale = 0.7;
        this.currentMode = previewConfig.defaultMode;
        this.metadata = null;
    }

    async createPopup(x, y) {
        const popup = document.createElement('div');
        popup.className = 'preview-popup';
        
        popup.innerHTML = `
            <div class="preview-toolbar">
                <button onclick="currentPreview.zoomIn()" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
                <button onclick="currentPreview.zoomOut()" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <button onclick="currentPreview.close()" title="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="preview-header">
                <img class="preview-favicon" 
                     src="https://${this.url}/favicon.ico" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>'">
                <span>${this.name || this.url}</span>
            </div>
            <div class="preview-modes">
                <button class="preview-mode-btn active" onclick="currentPreview.setMode('desktop')">
                    <i class="fas fa-desktop"></i> Desktop
                </button>
                <button class="preview-mode-btn" onclick="currentPreview.setMode('mobile')">
                    <i class="fas fa-mobile-alt"></i> Mobile
                </button>
                <button class="preview-mode-btn" onclick="currentPreview.setMode('tablet')">
                    <i class="fas fa-tablet-alt"></i> Tablet
                </button>
                <button class="preview-mode-btn" onclick="currentPreview.setMode('snapshot')">
                    <i class="fas fa-info-circle"></i> Info
                </button>
            </div>
            <div class="preview-content desktop-mode" id="preview-content-${this.url}">
                <div class="loading-overlay" id="loading-${this.url}">
                    <div class="loading-spinner"></div>
                    <p>Loading preview...</p>
                </div>
                <iframe 
                    class="preview-iframe" 
                    src="https://${this.url}" 
                    sandbox="allow-same-origin allow-scripts"
                    loading="lazy"
                    onload="currentPreview.handleIframeLoad()"
                ></iframe>
            </div>
            <div class="preview-actions">
                <div class="preview-meta">
                    <i class="fas fa-globe me-2"></i>
                    <span id="status-${this.url}">Checking status...</span>
                </div>
                <div class="preview-buttons">
                    <button class="btn btn-sm btn-outline-secondary" onclick="currentPreview.capture()">
                        <i class="fas fa-camera me-1"></i> Capture
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="window.open('https://${this.url}', '_blank')">
                        Visit Site
                    </button>
                </div>
            </div>
        `;

        popup.style.top = `${y}px`;
        popup.style.left = `${x}px`;
        
        document.body.appendChild(popup);
        this.popup = popup;
        
        this.checkSiteStatus();
        this.fetchMetadata();
        
        setTimeout(() => {
            popup.style.display = 'block';
        }, 0);

        return popup;
    }

    async checkSiteStatus() {
        const statusElement = document.getElementById(`status-${this.url}`);
        try {
            const response = await fetch(`https://${this.url}`, { mode: 'no-cors' });
            statusElement.innerHTML = `
                <span class="text-success">
                    <i class="fas fa-check-circle me-1"></i> Site is online
                </span>
            `;
        } catch (error) {
            statusElement.innerHTML = `
                <span class="text-warning">
                    <i class="fas fa-exclamation-circle me-1"></i> Status unavailable
                </span>
            `;
        }
    }

    async fetchMetadata() {
        try {
            const response = await fetch(`https://${this.url}`);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            this.metadata = {
                title: doc.title,
                description: doc.querySelector('meta[name="description"]')?.content || 'No description available',
                keywords: doc.querySelector('meta[name="keywords"]')?.content || 'No keywords available',
                lastModified: response.headers.get('last-modified') || 'Unknown',
                contentType: response.headers.get('content-type') || 'Unknown'
            };
        } catch (error) {
            this.metadata = {
                title: 'Metadata unavailable',
                description: 'Could not fetch site metadata',
                keywords: 'N/A',
                lastModified: 'Unknown',
                contentType: 'Unknown'
            };
        }
    }

    setMode(mode) {
        const content = document.getElementById(`preview-content-${this.url}`);
        const buttons = this.popup.querySelectorAll('.preview-mode-btn');
        
        buttons.forEach(btn => btn.classList.remove('active'));
        this.popup.querySelector(`.preview-mode-btn:nth-child(${
            mode === 'desktop' ? 1 : 
            mode === 'mobile' ? 2 : 
            mode === 'tablet' ? 3 : 4
        })`).classList.add('active');

        content.classList.add('mode-transition');
        content.classList.remove('desktop-mode', 'mobile-mode', 'tablet-mode');

        if (mode === 'snapshot') {
            content.innerHTML = this.getSnapshotHTML();
        } else {
            if (this.currentMode === 'snapshot') {
                content.innerHTML = this.getIframeHTML();
            }
            content.classList.add(`${mode}-mode`);
        }

        this.currentMode = mode;
        setTimeout(() => content.classList.remove('mode-transition'), 300);
    }

    getSnapshotHTML() {
        return `
            <div class="preview-snapshot">
                <div class="snapshot-info">
                    <div class="snapshot-item">
                        <h6><i class="fas fa-heading me-2"></i>Page Title</h6>
                        <div>${this.metadata?.title || 'Loading...'}</div>
                    </div>
                    <div class="snapshot-item">
                        <h6><i class="fas fa-align-left me-2"></i>Description</h6>
                        <div>${this.metadata?.description || 'Loading...'}</div>
                    </div>
                    <div class="snapshot-item">
                        <h6><i class="fas fa-tags me-2"></i>Keywords</h6>
                        <div>${this.metadata?.keywords || 'Loading...'}</div>
                    </div>
                    <div class="snapshot-item">
                        <h6><i class="fas fa-clock me-2"></i>Last Modified</h6>
                        <div>${this.metadata?.lastModified || 'Loading...'}</div>
                    </div>
                </div>
            </div>
        `;
    }

    getIframeHTML() {
        return `
            <div class="loading-overlay" id="loading-${this.url}">
                <div class="loading-spinner"></div>
                <p>Loading preview...</p>
            </div>
            <iframe 
                class="preview-iframe" 
                src="https://${this.url}" 
                sandbox="allow-same-origin allow-scripts"
                loading="lazy"
                onload="currentPreview.handleIframeLoad()"
            ></iframe>
        `;
    }

    handleIframeLoad() {
        const loading = document.getElementById(`loading-${this.url}`);
        if (loading) {
            loading.style.display = 'none';
        }
    }

    zoomIn() {
        this.scale = Math.min(this.scale + 0.1, 1);
        this.updateScale();
    }

    zoomOut() {
        this.scale = Math.max(this.scale - 0.1, 0.3);
        this.updateScale();
    }

    updateScale() {
        const iframe = this.popup.querySelector('.preview-iframe');
        if (iframe) {
            iframe.style.transform = `scale(${this.scale})`;
            iframe.style.width = `${100/this.scale}%`;
            iframe.style.height = `${100/this.scale}%`;
        }
    }

    capture() {
        const btn = this.popup.querySelector('.preview-buttons button');
        btn.innerHTML = '<i class="fas fa-check me-1"></i> Captured!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-camera me-1"></i> Capture';
        }, 2000);
    }

    close() {
        if (this.popup) {
            this.popup.remove();
            this.popup = null;
        }
    }
}

// Export for global use
window.SitePreview = SitePreview;
window.currentPreview = null;