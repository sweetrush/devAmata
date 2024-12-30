// Site Data Configuration
const siteData = {
    // Search Engines
    searchEngines: [
        { url: 'www.google.com', name: 'Google', category: 'Search' },
        { url: 'www.bing.com', name: 'Bing', category: 'Search' },
        { url: 'duckduckgo.com', name: 'DuckDuckGo', category: 'Search' },
        { url: 'www.yahoo.com', name: 'Yahoo', category: 'Search' }
    ],

    // Government Sites
    govSites: [
        { url: 'www.psc.gov.ws', name: 'Public Service Commission', category: 'Government' },
        { url: 'www.health.gov.ws', name: 'Ministry of Health', category: 'Government' },
        { url: 'www.mesc.gov.ws', name: 'Ministry of Education', category: 'Government' },
        { url: 'www.mof.gov.ws', name: 'Ministry of Finance', category: 'Government' },
        { url: 'www.mcit.gov.ws', name: 'Ministry of Communications', category: 'Government' }
    ],

    // Banks
    bankSites: [
        { url: 'www.bsp.com.ws', name: 'BSP Bank', category: 'Banking' },
        { url: 'www.anz.com/samoa', name: 'ANZ Bank', category: 'Banking' },
        { url: 'www.nbs.ws', name: 'National Bank Samoa', category: 'Banking' },
        { url: 'www.cbs.gov.ws', name: 'Central Bank of Samoa', category: 'Banking' }
    ]
};

// Preview Configuration
const previewConfig = {
    modes: {
        desktop: {
            width: '100%',
            height: '100%',
            scale: 1
        },
        mobile: {
            width: '375px',
            height: '667px',
            scale: 0.75
        },
        tablet: {
            width: '768px',
            height: '1024px',
            scale: 0.4
        }
    },
    defaultMode: 'desktop',
    animationDuration: 300,
    previewWidth: 450
};

// Export configurations
window.siteData = siteData;
window.previewConfig = previewConfig;