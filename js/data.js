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
        { url: 'www.utos.gov.ws', name: 'Unit Trust of Samoa', category: 'Banking' },
        { url: 'www.spbsamoa.ws', name: 'Samoa Provident Bank', category: 'Banking' }
    ],

    // Education & Research
    educationSites: [
        { url: 'www.nus.edu.ws', name: 'National University of Samoa', category: 'Education' },
        { url: 'www.samoaqualifications.ws', name: 'Samoa Qualifications Authority', category: 'Education' },
        { url: 'www.nesc.edu.ws', name: 'National E-Learning Support Center', category: 'Education' },
        { url: 'www.samoa.school.ws', name: 'Samoa School Net', category: 'Education' }
    ],

    // Business & Commerce
    businessSites: [
        { url: 'www.chamber.ws', name: 'Chamber of Commerce', category: 'Business' },
        { url: 'www.samoatrades.ws', name: 'Samoa Trade Directory', category: 'Business' },
        { url: 'www.sros.org.ws', name: 'Scientific Research Organisation', category: 'Business' },
        { url: 'www.same.org.ws', name: 'Samoa Association of Manufacturers', category: 'Business' }
    ],

    // Tourism & Culture
    tourismSites: [
        { url: 'www.samoa.travel', name: 'Samoa Tourism Authority', category: 'Tourism' },
        { url: 'www.samoahotel.ws', name: 'Samoa Hotel Association', category: 'Tourism' },
        { url: 'www.visitsamoa.ws', name: 'Visit Samoa', category: 'Tourism' },
        { url: 'www.culture.gov.ws', name: 'Ministry of Culture', category: 'Tourism' }
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
        { url: 'www.talamua.ws', name: 'Talamua Media', category: 'Media' },
        { url: 'www.samoatimes.ws', name: 'Samoa Times', category: 'Media' },
        { url: 'www.radio.gov.ws', name: 'Radio 2AP', category: 'Media' }
    ],

    // Sports & Recreation
    sportsSites: [
        { url: 'www.samoasports.ws', name: 'Samoa Sports Federation', category: 'Sports' },
        { url: 'www.samoarugby.ws', name: 'Samoa Rugby Union', category: 'Sports' },
        { url: 'www.oceaniaathletics.ws', name: 'Oceania Athletics', category: 'Sports' }
    ],

    // Healthcare
    healthSites: [
        { url: 'www.nkfsamoa.org.ws', name: 'National Kidney Foundation', category: 'Health' },
        { url: 'www.samoapharma.ws', name: 'Samoa Pharmacy', category: 'Health' },
        { url: 'www.nhss.gov.ws', name: 'National Health Service', category: 'Health' }
    ],

    // E-Commerce & Shopping
    ecommerceSites: [
        { url: 'www.maua.app', name: 'Maua App', category: 'Shopping' },
        { url: 'www.samoamarket.com.ws', name: 'Samoa Market', category: 'Shopping' },
        { url: 'www.ssab.ws', name: 'SSAB Samoa', category: 'Shopping' },
        { url: 'www.samoapacific.ws', name: 'Samoa Pacific', category: 'Shopping' },
        { url: 'www.frankiesamoa.ws', name: 'Frankie Samoa', category: 'Shopping' },
        { url: 'www.samoacart.ws', name: 'Samoa Cart', category: 'Shopping' }
    ],

    // Telecommunications
    telecomSites: [
        { url: 'www.digicelgroup.com.ws', name: 'Digicel Samoa', category: 'Telecom' },
        { url: 'www.vodafone.com.ws', name: 'Vodafone Samoa', category: 'Telecom' },
        { url: 'www.csl.ws', name: 'Computer Services Limited', category: 'Telecom' },
        { url: 'www.bluesky.ws', name: 'Bluesky Samoa', category: 'Telecom' }
    ],

    // Internet Service Providers
    ispSites: [
        { url: 'www.samoadigital.ws', name: 'Samoa Digital', category: 'ISP' },
        { url: 'www.lesamoa.ws', name: 'Le Samoa', category: 'ISP' },
        { url: 'www.netvo.ws', name: 'Netvo Samoa', category: 'ISP' },
        { url: 'www.wifi.ws', name: 'Wifi Samoa', category: 'ISP' }
    ],

    // Local Communities & Organizations
    communitySites: [
        { url: 'www.samoared.ws', name: 'Samoa Red Cross', category: 'Community' },
        { url: 'www.youthcouncil.ws', name: 'National Youth Council', category: 'Community' },
        { url: 'www.sfa.ws', name: 'Samoa Farmers Association', category: 'Community' },
        { url: 'www.swag.org.ws', name: 'Samoa Women Association', category: 'Community' }
    ],

    // Food & Agriculture
    foodSites: [
        { url: 'www.samoafood.ws', name: 'Samoa Food Directory', category: 'Food' },
        { url: 'www.samoacrop.ws', name: 'Samoa Crop Production', category: 'Food' },
        { url: 'www.organicsamoa.ws', name: 'Organic Farming Samoa', category: 'Food' },
        { url: 'www.farmfresh.ws', name: 'Farm Fresh Samoa', category: 'Food' }
    ],

    // Environment & Conservation
    environmentSites: [
        { url: 'www.mnre.gov.ws', name: 'Ministry of Natural Resources', category: 'Environment' },
        { url: 'www.sprep.org.ws', name: 'Pacific Regional Environment', category: 'Environment' },
        { url: 'www.conservation.ws', name: 'Samoa Conservation', category: 'Environment' },
        { url: 'www.samoaclimate.ws', name: 'Climate Action Samoa', category: 'Environment' }
    ],

    // Real Estate & Property
    realEstateSites: [
        { url: 'www.samoahousing.ws', name: 'Samoa Housing Corporation', category: 'Real Estate' },
        { url: 'www.property.ws', name: 'Samoa Property Listings', category: 'Real Estate' },
        { url: 'www.samoahomes.ws', name: 'Samoa Homes', category: 'Real Estate' },
        { url: 'www.lease.ws', name: 'Samoa Lease Properties', category: 'Real Estate' }
    ],

    // Arts & Culture
    artSites: [
        { url: 'www.samoaarts.ws', name: 'Samoa Arts Council', category: 'Arts' },
        { url: 'www.museum.gov.ws', name: 'Museum of Samoa', category: 'Arts' },
        { url: 'www.heritage.ws', name: 'Samoa Heritage', category: 'Arts' },
        { url: 'www.samoancraft.ws', name: 'Samoan Crafts', category: 'Arts' }
    ],

    // Employment & Jobs
    jobSites: [
        { url: 'www.samoajobs.ws', name: 'Samoa Jobs', category: 'Employment' },
        { url: 'www.careers.gov.ws', name: 'Government Careers', category: 'Employment' },
        { url: 'www.worksamoa.ws', name: 'Work in Samoa', category: 'Employment' },
        { url: 'www.recruit.ws', name: 'Samoa Recruitment', category: 'Employment' }
    ],

    // Legal Services
    legalSites: [
        { url: 'www.samoalaw.ws', name: 'Samoa Law Society', category: 'Legal' },
        { url: 'www.justice.gov.ws', name: 'Ministry of Justice', category: 'Legal' },
        { url: 'www.court.gov.ws', name: 'Samoa Courts', category: 'Legal' },
        { url: 'www.samoapolicy.ws', name: 'Samoa Policy Office', category: 'Legal' }
    ],

    // Transportation
    transportSites: [
        { url: 'www.samoaairports.ws', name: 'Samoa Airport Authority', category: 'Transport' },
        { url: 'www.samoashipping.ws', name: 'Samoa Shipping Corporation', category: 'Transport' },
        { url: 'www.transport.gov.ws', name: 'Transport Ministry', category: 'Transport' },
        { url: 'www.taxi.ws', name: 'Samoa Taxi Services', category: 'Transport' }
    ],

    // Emergency Services
    emergencySites: [
        { url: 'www.police.gov.ws', name: 'Samoa Police Service', category: 'Emergency' },
        { url: 'www.fire.gov.ws', name: 'Fire & Emergency Services', category: 'Emergency' },
        { url: 'www.disaster.ws', name: 'Disaster Management Office', category: 'Emergency' },
        { url: 'www.ambulance.ws', name: 'Samoa Ambulance Service', category: 'Emergency' }
    ],

    // Search Engines (for reference)
    searchEngines: [
        { url: 'www.google.com', name: 'Google Search', category: 'Search' },
        { url: 'www.bing.com', name: 'Microsoft Bing', category: 'Search' },
        { url: 'duckduckgo.com', name: 'DuckDuckGo', category: 'Search' },
        { url: 'www.yahoo.com', name: 'Yahoo Search', category: 'Search' }
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
        Shopping: { icon: 'fa-shopping-cart', color: 'bg-primary' },
        Telecom: { icon: 'fa-phone', color: 'bg-warning' },
        ISP: { icon: 'fa-wifi', color: 'bg-info' },
        Community: { icon: 'fa-users', color: 'bg-success' },
        Food: { icon: 'fa-utensils', color: 'bg-warning' },
        Environment: { icon: 'fa-leaf', color: 'bg-success' },
        'Real Estate': { icon: 'fa-home', color: 'bg-primary' },
        Arts: { icon: 'fa-palette', color: 'bg-info' },
        Employment: { icon: 'fa-briefcase', color: 'bg-secondary' },
        Legal: { icon: 'fa-gavel', color: 'bg-dark' },
        Transport: { icon: 'fa-bus', color: 'bg-info' },
        Emergency: { icon: 'fa-ambulance', color: 'bg-danger' },
        Search: { icon: 'fa-search', color: 'bg-dark' }
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

    getCategoryCounts() {
        const counts = {};
        this.getAllSites().forEach(site => {
            counts[site.category] = (counts[site.category] || 0) + 1;
        });
        return counts;
    },

    searchSites(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllSites().filter(site => 
            site.name.toLowerCase().includes(searchTerm) ||
            site.url.toLowerCase().includes(searchTerm) ||
            site.category.toLowerCase().includes(searchTerm)
        );
    },

    getSitesByDomain(domain) {
        return this.getAllSites().filter(site => 
            site.url.endsWith(domain)
        );
    }
};

// Export for global use
window.siteData = siteData;
window.previewConfig = previewConfig;
window.siteDataHelpers = siteDataHelpers;