class SitePreview {
    constructor(url, name) {
        this.url = url;
        this.name = name;
        this.popup = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.isMinimized = false;
        this.isMaximized = false;
        this.originalDimensions = null;
    }

    createPopup(x, y) {
        const popup = document.createElement('div');
        popup.className = 'preview-popup';
        
        popup.innerHTML = `
            <div class="preview-title-bar">
                <div class="preview-title">
                    <img class="preview-favicon" 
                         src="https://${this.url}/favicon.ico" 
                         width="16" 
                         height="16"
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>'">
                    <span>${this.name || this.url}</span>
                </div>
                <div class="preview-controls">
                    <button class="preview-control-btn preview-minimize" onclick="currentPreview.minimize()">
                        <i class="fas fa-minus fa-xs"></i>
                    </button>
                    <button class="preview-control-btn preview-maximize" onclick="currentPreview.maximize()">
                        <i class="fas fa-expand fa-xs"></i>
                    </button>
                    <button class="preview-control-btn preview-close" onclick="currentPreview.close()">
                        <i class="fas fa-times fa-xs"></i>
                    </button>
                </div>
            </div>
            <div class="preview-content">
                <iframe 
                    class="preview-iframe" 
                    src="https://${this.url}" 
                    sandbox="allow-same-origin allow-scripts"
                    loading="lazy"
                ></iframe>
                <div class="preview-resize-handle"></div>
            </div>
        `;

        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        
        document.body.appendChild(popup);
        this.popup = popup;
        
        this.setupDragging();
        this.setupResizing();
        
        setTimeout(() => {
            popup.style.display = 'block';
        }, 0);

        return popup;
    }

    setupDragging() {
        const titleBar = this.popup.querySelector('.preview-title-bar');
        
        titleBar.addEventListener('mousedown', (e) => {
            if (this.isMaximized) return;
            
            this.isDragging = true;
            this.popup.classList.add('dragging');
            
            const rect = this.popup.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const x = e.clientX - this.dragOffset.x;
            const y = e.clientY - this.dragOffset.y;
            
            // Keep within window bounds
            const maxX = window.innerWidth - this.popup.offsetWidth;
            const maxY = window.innerHeight - this.popup.offsetHeight;
            
            this.popup.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
            this.popup.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.popup.classList.remove('dragging');
        });
    }

    setupResizing() {
        const handle = this.popup.querySelector('.preview-resize-handle');
        let isResizing = false;
        let startWidth, startHeight, startX, startY;

        handle.addEventListener('mousedown', (e) => {
            if (this.isMaximized) return;
            
            isResizing = true;
            startWidth = this.popup.offsetWidth;
            startHeight = this.popup.offsetHeight;
            startX = e.clientX;
            startY = e.clientY;
            
            document.body.style.cursor = 'se-resize';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const width = startWidth + (e.clientX - startX);
            const height = startHeight + (e.clientY - startY);

            this.popup.style.width = `${Math.max(300, width)}px`;
            this.popup.style.height = `${Math.max(200, height)}px`;
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.body.style.cursor = '';
        });
    }

    minimize() {
        if (this.isMaximized) this.maximize();
        
        this.isMinimized = !this.isMinimized;
        this.popup.classList.toggle('minimized');
        
        const btn = this.popup.querySelector('.preview-minimize i');
        btn.className = this.isMinimized ? 'fas fa-plus fa-xs' : 'fas fa-minus fa-xs';
    }

    maximize() {
        if (this.isMinimized) this.minimize();
        
        if (!this.isMaximized) {
            this.originalDimensions = {
                width: this.popup.style.width,
                height: this.popup.style.height,
                top: this.popup.style.top,
                left: this.popup.style.left
            };
        }
        
        this.isMaximized = !this.isMaximized;
        this.popup.classList.toggle('maximized');
        
        if (!this.isMaximized) {
            Object.assign(this.popup.style, this.originalDimensions);
        }
        
        const btn = this.popup.querySelector('.preview-maximize i');
        btn.className = this.isMaximized ? 'fas fa-compress fa-xs' : 'fas fa-expand fa-xs';
    }

    close() {
        if (this.popup) {
            this.popup.remove();
            this.popup = null;
        }
        currentPreview = null;
    }
}

window.SitePreview = SitePreview;
window.currentPreview = null;