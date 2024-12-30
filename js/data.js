// Site Data Configuration
const siteData = {
    // Government Sites
    govSites: [
        { url: 'www.psc.gov.ws', name: 'Public Service Commission', category: 'Government' },
        { url: 'www.audit.gov.ws', name: 'Audit Office', category: 'Government' },
        { url: 'www.ag.gov.ws', name: 'Attorney General Office', category: 'Government' },
        { url: 'www.palemene.ws', name: 'Parliament of Samoa', category: 'Government' },
        { url: 'www.ombudsman.gov.ws', name: 'Ombudsman Office', category: 'Government' },
        { url: 'www.regulator.gov.ws', name: 'Office of the Regulator', category: 'Government' },
        { url: 'www.oec.gov.ws', name: 'Office of the Electoral Commission', category: 'Government' },
        { url: 'www.samoalawreform.gov.ws', name: 'Law Reform Commission', category: 'Government' },
        { url: 'www.sbs.gov.ws', name: 'Samoa Bureau of Statistics', category: 'Government' },
        { url: 'www.maf.gov.ws', name: 'Ministry of Agriculture', category: 'Government' },
        { url: 'www.revenue.gov.ws', name: 'Ministry for Revenue', category: 'Government' },
        { url: 'www.mcil.gov.ws', name: 'Ministry of Commerce', category: 'Government' },
        { url: 'www.mcit.gov.ws', name: 'Ministry of Communications', category: 'Government' },
        { url: 'www.mesc.gov.ws', name: 'Ministry of Education', category: 'Government' },
        { url: 'www.mof.gov.ws', name: 'Ministry of Finance', category: 'Government' },
        { url: 'www.mfat.gov.ws', name: 'Ministry of Foreign Affairs', category: 'Government' },
        { url: 'www.health.gov.ws', name: 'Ministry of Health', category: 'Government' },
        { url: 'www.mjca.gov.ws', name: 'Ministry of Justice', category: 'Government' },
        { url: 'www.mpmc.gov.ws', name: 'Ministry of Prime Minister', category: 'Government' },
        { url: 'www.mwcsd.gov.ws', name: 'Ministry of Women & Social Dev', category: 'Government' }
    ],

    // Financial Institutions
    bankSites: [
        { url: 'www.cbs.gov.ws', name: 'Central Bank of Samoa', category: 'Banking' },
        { url: 'www.bsp.com.ws', name: 'BSP Bank Samoa', category: 'Banking' },
        { url: 'www.nbs.ws', name: 'National Bank of Samoa', category: 'Banking' },
        { url: 'www.sifa.ws', name: 'Samoa Int. Finance Authority', category: 'Banking' },
        { url: 'www.dbsamoa.ws', name: 'Development Bank of Samoa', category: 'Banking' },
        { url: 'www.utos.gov.ws', name: 'Unit Trust of Samoa', category: 'Banking' }
    ],

    // Education & Research
    educationSites: [
        { url: 'www.nus.edu.ws', name: 'National University of Samoa', category: 'Education' },
        { url: 'www.nesc.edu.ws', name: 'National E-Learning Support Center', category: 'Education' },
        { url: 'www.mesc.gov.ws', name: 'Ministry of Education', category: 'Education' },
        { url: 'www.samoa.school.ws', name: 'Samoa School Net', category: 'Education' }
    ],

    // Business & Commerce
    businessSites: [
        { url: 'www.mcil.gov.ws', name: 'Ministry of Commerce', category: 'Business' },
        { url: 'www.sros.org.ws', name: 'Scientific Research Organisation', category: 'Business' }
    ],

    // Tourism & Culture
    tourismSites: [
        { url: 'www.samoa.travel.ws', name: 'Samoa Tourism Authority', category: 'Tourism' },
        { url: 'www.samoahotel.ws', name: 'Samoa Hotel Association', category: 'Tourism' }
    ],

    // Utilities & Infrastructure
    utilitySites: [
        { url: 'www.epc.ws', name: 'Electric Power Corporation', category: 'Utility' },
        { url: 'www.swa.gov.ws', name: 'Samoa Water Authority', category: 'Utility' },
        { url: 'www.lta.gov.ws', name: 'Land Transport Authority', category: 'Utility' },
        { url: 'www.samoaland.ws', name: 'Samoa Land Corporation', category: 'Utility' },
        { url: 'www.spasamoa.ws', name: 'Samoa Ports Authority', category: 'Utility' },
        { url: 'www.samoapost.ws', name: 'Samoa Post Office', category: 'Utility' }
    ],

    // Media & Communication
    mediaSites: [
        { url: 'www.samoaobserver.ws', name: 'Samoa Observer', category: 'Media' },
        { url: 'www.radio2ap.ws', name: 'Radio 2AP', category: 'Media' }
    ],

    // Sports & Recreation
    sportsSites: [
        { url: 'www.samoarugby.ws', name: 'Samoa Rugby Union', category: 'Sports' },
        { url: 'www.sru.ws', name: 'Samoa Rugby', category: 'Sports' }
    ],

    // Healthcare
    healthSites: [
        { url: 'www.health.gov.ws', name: 'Ministry of Health', category: 'Health' },
        { url: 'www.nkfsamoa.ws', name: 'National Kidney Foundation', category: 'Health' }
    ],

    // Telecommunications
    telecomSites: [
        { url: 'www.digicelgroup.ws', name: 'Digicel Samoa', category: 'Telecom' },
        { url: 'www.vodafone.ws', name: 'Vodafone Samoa', category: 'Telecom' },
        { url: 'www.bluesky.ws', name: 'Bluesky Samoa', category: 'Telecom' }
    ],

    // Internet Service Providers
    ispSites: [
        { url: 'www.csl.ws', name: 'Computer Services Limited', category: 'ISP' },
        { url: 'www.lesamoa.ws', name: 'Le Samoa', category: 'ISP' },
        { url: 'www.ipasifika.ws', name: 'Ipasifika', category: 'ISP' }
    ]
};

// Configuration for preview features
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
    previewWidth: 450,
    statusCheck: {
        timeout: 5000,
        retryCount: 3
    },
    categories: {
        Government: { icon: 'fa-landmark', color: 'bg-primary' },
        Banking: { icon: 'fa-university', color: 'bg-success' },
        Education: { icon: 'fa-graduation-cap', color: 'bg-info' },
        Business: { icon: 'fa-briefcase', color: 'bg-secondary' },
        Tourism: { icon: 'fa-umbrella-beach', color: 'bg-warning' },
        Utility: { icon: 'fa-bolt', color: 'bg-danger' },
        Media: { icon: 'fa-newspaper', color: 'bg-info' },
        Sports: { icon: 'fa-futbol', color: 'bg-success' },
        Health: { icon: 'fa-hospital', color: 'bg-danger' },
        Telecom: { icon: 'fa-phone', color: 'bg-warning' },
        ISP: { icon: 'fa-wifi', color: 'bg-info' }
    }
};

// Helper functions for data access
const siteDataHelpers = {
    getAllSites() {
        return Object.values(siteData).flat();
    },

    getSitesByCategory(category) {
        return this.getAllSites().filter(site => site.category === category);
    },

    getCategories() {
        return Object.keys(previewConfig.categories);
    },

    getCategoryInfo(category) {
        return previewConfig.categories[category] || {
            icon: 'fa-globe',
            color: 'bg-secondary'
        };
    },

    getSiteCount() {
        return this.getAllSites().length;
    },

    searchSites(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllSites().filter(site => 
            site.name.toLowerCase().includes(searchTerm) ||
            site.url.toLowerCase().includes(searchTerm) ||
            site.category.toLowerCase().includes(searchTerm)
        );
    }
};

// Export for global use
window.siteData = siteData;
window.previewConfig = previewConfig;
window.siteDataHelpers = siteDataHelpers;