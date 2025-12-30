// ============================================
// Translation Manager
// ============================================
class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        // Load saved language preference or default to 'en'
        const savedLang = localStorage.getItem('callshield-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
        
        // Apply initial translations
        this.translateAll();
        
        // Setup language selector event listeners
        this.setupEventListeners();
        
        // Update language selector UI
        this.updateLanguageSelector();
    }

    setupEventListeners() {
        const langBtnEn = document.getElementById('lang-btn-en');
        const langBtnIt = document.getElementById('lang-btn-it');
        
        if (langBtnEn) {
            langBtnEn.addEventListener('click', () => this.setLanguage('en'));
        }
        
        if (langBtnIt) {
            langBtnIt.addEventListener('click', () => this.setLanguage('it'));
        }
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not found`);
            return;
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('callshield-language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', this.getTranslation('meta.description'));
        }
        
        // Update page title
        document.title = this.getTranslation('meta.title');
        
        // Translate all elements
        this.translateAll();
        
        // Update language selector UI
        this.updateLanguageSelector();
        
        // Update tutorial steps if tutorial manager exists
        if (window.tutorialManager) {
            window.tutorialManager.updateTranslations();
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return value || key;
    }

    translateElement(element) {
        // Handle data-i18n attribute
        const i18nKey = element.getAttribute('data-i18n');
        if (i18nKey) {
            const translation = this.getTranslation(i18nKey);
            
            // Handle special cases
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For inputs, check if it's a placeholder
                if (element.hasAttribute('data-i18n-placeholder')) {
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    element.placeholder = this.getTranslation(placeholderKey);
                } else {
                    element.value = translation;
                }
            } else if (element.tagName === 'META') {
                // Meta tags are handled separately
                return;
            } else {
                element.textContent = translation;
            }
        }
        
        // Handle data-i18n-placeholder for inputs
        if (element.hasAttribute('data-i18n-placeholder')) {
            const placeholderKey = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getTranslation(placeholderKey);
        }
        
        // Handle data-i18n-aria-label
        if (element.hasAttribute('data-i18n-aria-label')) {
            const ariaLabelKey = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.getTranslation(ariaLabelKey));
        }
        
        // Handle data-i18n-prefix (for elements with dynamic content)
        if (element.hasAttribute('data-i18n-prefix')) {
            const prefixKey = element.getAttribute('data-i18n-prefix');
            const prefix = this.getTranslation(prefixKey);
            const originalText = element.textContent;
            // Extract number if present
            const match = originalText.match(/(\d+)/);
            if (match) {
                element.textContent = `${prefix} ${match[1]}`;
            } else {
                element.textContent = prefix;
            }
        }
    }

    translateAll() {
        // Translate all elements with data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-aria-label], [data-i18n-prefix]');
        elements.forEach(element => this.translateElement(element));
        
        // Update status label dynamically (ENABLED/DISABLED)
        const statusLabel = document.getElementById('status-label');
        if (statusLabel) {
            const switchProtection = document.getElementById('switch-protection');
            if (switchProtection && switchProtection.checked) {
                statusLabel.textContent = this.getTranslation('appScreens.home.statusEnabled');
            } else {
                statusLabel.textContent = this.getTranslation('appScreens.home.statusDisabled');
            }
        }
        
        // Update whitelist count badge
        const whitelistCount = document.getElementById('whitelist-count');
        if (whitelistCount) {
            const activeText = this.getTranslation('appScreens.whitelist.active');
            const match = whitelistCount.textContent.match(/(\d+)/);
            if (match) {
                whitelistCount.textContent = `${match[1]} ${activeText}`;
            }
        }
    }

    updateLanguageSelector() {
        const langBtnEn = document.getElementById('lang-btn-en');
        const langBtnIt = document.getElementById('lang-btn-it');
        
        if (langBtnEn && langBtnIt) {
            // Remove active class from both
            langBtnEn.classList.remove('active');
            langBtnIt.classList.remove('active');
            
            // Add active class to current language
            if (this.currentLanguage === 'en') {
                langBtnEn.classList.add('active');
            } else if (this.currentLanguage === 'it') {
                langBtnIt.classList.add('active');
            }
        }
    }
}

// ============================================
// Tutorial Manager
// ============================================
class TutorialManager {
    constructor() {
        this.currentStep = 0;
        this.steps = [];
        this.isActive = false;
        this.init();
    }

    init() {
        this.setupSteps();
        this.setupEventListeners();
    }

    setupSteps() {
        this.updateTranslations();
    }

    updateTranslations() {
        const translationManager = window.translationManager;
        if (!translationManager) {
            // Fallback to English if translation manager not available
            this.setupStepsFallback();
            return;
        }

        const t = translationManager.translations[translationManager.currentLanguage];
        const steps = t.tutorial.steps;
        
        this.steps = [
            {
                screen: 'home',
                element: '.protection-card',
                title: steps[0].title,
                text: steps[0].text,
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.stats-cards-row',
                title: steps[1].title,
                text: steps[1].text,
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.quick-actions-grid',
                title: steps[2].title,
                text: steps[2].text,
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.recent-activity-list',
                title: steps[3].title,
                text: steps[3].text,
                position: 'top'
            },
            {
                screen: 'whitelist',
                element: '.search-card',
                title: steps[4].title,
                text: steps[4].text,
                position: 'bottom'
            },
            {
                screen: 'whitelist',
                element: '.allow-contacts-card',
                title: steps[5].title,
                text: steps[5].text,
                position: 'bottom'
            },
            {
                screen: 'whitelist',
                element: '.whitelist-section',
                title: steps[6].title,
                text: steps[6].text,
                position: 'bottom'
            },
            {
                screen: 'statistics',
                element: '.chart-card',
                title: steps[7].title,
                text: steps[7].text,
                position: 'bottom'
            },
            {
                screen: 'statistics',
                element: '.top-origins-card',
                title: steps[8].title,
                text: steps[8].text,
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '.blacklist-sub-nav',
                title: steps[9].title,
                text: steps[9].text,
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-countries .filter-chips',
                title: steps[10].title,
                text: steps[10].text,
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-countries .country-item',
                title: steps[11].title,
                text: steps[11].text,
                position: 'left'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-numbers',
                title: steps[12].title,
                text: steps[12].text,
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-settings',
                title: steps[13].title,
                text: steps[13].text,
                position: 'bottom'
            }
        ];
        
        // Update current step if tutorial is active
        if (this.isActive && this.steps[this.currentStep]) {
            this.showStep();
        }
    }

    setupStepsFallback() {
        // Fallback English steps if translation manager not available
        this.steps = [
            {
                screen: 'home',
                element: '.protection-card',
                title: 'Protection Status',
                text: 'This is the main protection card. Toggle the switch to enable or disable call blocking. When enabled, CallShield will automatically block unwanted calls.',
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.stats-cards-row',
                title: 'Statistics',
                text: 'View your blocking statistics here. See how many calls were blocked today and in total. The progress bars show your blocking activity.',
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.quick-actions-grid',
                title: 'Quick Actions',
                text: 'Access key features quickly from here. Tap on any card to navigate to Whitelist, Countries, Numbers, or Settings.',
                position: 'bottom'
            },
            {
                screen: 'home',
                element: '.recent-activity-list',
                title: 'Recent Activity',
                text: 'See your recently blocked calls here. This helps you track what numbers have been blocked and when.',
                position: 'top'
            },
            {
                screen: 'whitelist',
                element: '.search-card',
                title: 'Search Whitelist',
                text: 'Search for numbers in your whitelist. Type to filter the list and find specific contacts quickly.',
                position: 'bottom'
            },
            {
                screen: 'whitelist',
                element: '.allow-contacts-card',
                title: 'Allow All Contacts',
                text: 'Enable this option to automatically whitelist everyone in your address book. This ensures all your saved contacts can always reach you.',
                position: 'bottom'
            },
            {
                screen: 'whitelist',
                element: '.whitelist-section',
                title: 'Add to Whitelist',
                text: 'You can manually add contacts to your whitelist. View your whitelisted numbers here and manage them individually. Numbers in the whitelist will always be allowed to call you.',
                position: 'bottom'
            },
            {
                screen: 'statistics',
                element: '.chart-card',
                title: 'Activity Chart',
                text: 'View your blocking activity over time. Switch between Daily, Weekly, and Monthly views. Use the navigation arrows to browse different periods.',
                position: 'bottom'
            },
            {
                screen: 'statistics',
                element: '.top-origins-card',
                title: 'Top Origins',
                text: 'See which countries are sending the most blocked calls. This helps you identify patterns and adjust your blocking settings.',
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '.blacklist-sub-nav',
                title: 'Blacklist Navigation',
                text: 'The Blacklist section has three parts: Countries, Numbers, and Settings. Use these tabs to navigate between different blocking options.',
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-countries .filter-chips',
                title: 'Filter Countries',
                text: 'Filter countries by status: All, Blocked, or Allowed. This makes it easier to manage large lists of countries.',
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-countries .country-item',
                title: 'Block Countries',
                text: 'Toggle the switch next to each country to block or allow calls from that region. Green means allowed, red means blocked.',
                position: 'left'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-numbers',
                title: 'Number Blacklist',
                text: 'Add specific phone numbers to always block. These numbers will be blocked regardless of other settings.',
                position: 'bottom'
            },
            {
                screen: 'blacklist',
                element: '#blacklist-settings',
                title: 'Blacklist Settings',
                text: 'Configure advanced blocking rules. Block unknown numbers or numbers without international prefix.',
                position: 'bottom'
            }
        ];
    }

    setupEventListeners() {
        const startBtn = document.getElementById('btn-start-tutorial');
        const startBtnHero = document.getElementById('btn-start-tutorial-hero');
        const skipBtn = document.getElementById('tutorial-skip');
        const prevBtn = document.getElementById('tutorial-prev');
        const nextBtn = document.getElementById('tutorial-next');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.start());
        }

        if (startBtnHero) {
            startBtnHero.addEventListener('click', () => this.start());
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.stop());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previous());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;

            if (e.key === 'Escape') {
                this.stop();
            } else if (e.key === 'ArrowLeft') {
                this.previous();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // Scroll listener with debouncing
        let scrollTimer;
        this.scrollHandler = () => {
            if (!this.isActive) return;
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.recalculatePositions();
            }, 50);
        };
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }

    start() {
        this.currentStep = 0;
        this.isActive = true;
        // Block scroll
        document.body.style.overflow = 'hidden';
        this.showStep();
    }

    stop() {
        this.isActive = false;
        // Restore scroll
        document.body.style.overflow = '';
        this.hideOverlay();
        // Return to home screen when tutorial finishes
        if (window.screenManager) {
            window.screenManager.showScreen('home');
        }
    }

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep();
        } else {
            this.stop();
        }
    }

    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    showStep(retryCount = 0) {
        const step = this.steps[this.currentStep];
        if (!step) return;

        console.log(`[Tutorial] showStep called - Step ${this.currentStep}, Retry ${retryCount}, Element: ${step.element}`);

        // Prevent infinite loops - max 2 retries
        if (retryCount > 2) {
            console.error('[Tutorial] MAX RETRIES REACHED - Stopping loop for:', step.element);
            console.error('[Tutorial] Debug info:', {
                step: this.currentStep,
                element: step.element,
                screen: step.screen,
                retryCount: retryCount
            });
            return;
        }

        // Check if this step requires a sub-screen change
        let requiresSubScreenChange = false;
        let subScreenName = null;
        if (step.screen === 'blacklist' && window.blacklistManager) {
            const subScreenMatch = step.element.match(/blacklist-(countries|numbers|settings)/);
            if (subScreenMatch) {
                requiresSubScreenChange = true;
                subScreenName = subScreenMatch[1];
                console.log(`[Tutorial] Requires sub-screen change to: ${subScreenName}`);
            }
        }

        // Switch to the correct screen
        const screenManager = window.screenManager;
        if (screenManager) {
            screenManager.showScreen(step.screen);
            
            // If it's a blacklist sub-screen, switch to it
            if (requiresSubScreenChange && window.blacklistManager) {
                console.log(`[Tutorial] Switching to sub-screen: ${subScreenName}`);
                window.blacklistManager.showSubScreen(subScreenName);
            }
        }

        // Increase timeout when sub-screen change is required (sub-screen needs more time to activate)
        const initialTimeout = requiresSubScreenChange ? 700 : 300;
        console.log(`[Tutorial] Waiting ${initialTimeout}ms before checking element visibility`);

        // Wait for screen to be visible and use requestAnimationFrame for synchronization
        setTimeout(() => {
            requestAnimationFrame(() => {
                console.log(`[Tutorial] Checking element visibility for: ${step.element}`);
                
                // For selectors that match multiple elements (like .country-item), find the first visible one
                let element;
                if (step.element.includes('.country-item') || step.element.includes('.whitelist-item')) {
                    // Find first visible element matching the selector
                    const allElements = document.querySelectorAll(step.element);
                    console.log(`[Tutorial] Found ${allElements.length} elements matching selector`);
                    
                    element = Array.from(allElements).find(el => {
                        const rect = el.getBoundingClientRect();
                        const style = window.getComputedStyle(el);
                        const isVisible = rect.width > 0 && rect.height > 0 && 
                                         style.display !== 'none' &&
                                         style.visibility !== 'hidden' &&
                                         style.opacity !== '0';
                        console.log(`[Tutorial] Element visibility check:`, {
                            width: rect.width,
                            height: rect.height,
                            display: style.display,
                            visibility: style.visibility,
                            opacity: style.opacity,
                            isVisible: isVisible
                        });
                        return isVisible;
                    }) || allElements[0]; // Fallback to first element if none visible
                    
                    if (element) {
                        console.log(`[Tutorial] Selected element:`, element);
                    }
                } else {
                    element = document.querySelector(step.element);
                }

                if (!element) {
                    console.error('[Tutorial] Element not found:', step.element);
                    console.error('[Tutorial] Available elements in DOM:', {
                        screenActive: document.querySelector(`#screen-${step.screen}`)?.classList.contains('active'),
                        subScreenActive: requiresSubScreenChange ? document.getElementById(`blacklist-${subScreenName}`)?.classList.contains('active') : 'N/A'
                    });
                    return;
                }

                // Verify that parent sub-screen is active (for blacklist elements)
                if (requiresSubScreenChange) {
                    const subScreen = document.getElementById(`blacklist-${subScreenName}`);
                    const isSubScreenActive = subScreen?.classList.contains('active');
                    console.log(`[Tutorial] Sub-screen active check:`, {
                        subScreenId: `blacklist-${subScreenName}`,
                        exists: !!subScreen,
                        isActive: isSubScreenActive,
                        display: subScreen ? window.getComputedStyle(subScreen).display : 'N/A'
                    });
                    
                    if (subScreen && !isSubScreenActive) {
                        console.warn(`[Tutorial] Sub-screen not active yet, retrying... (retry ${retryCount + 1})`);
                        if (retryCount < 2) {
                            setTimeout(() => this.showStep(retryCount + 1), 300);
                            return;
                        } else {
                            console.error('[Tutorial] Sub-screen still not active after retries, forcing activation');
                            subScreen.classList.add('active');
                        }
                    }
                }

                // Check if element is visible - improved check including parent visibility
                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);
                
                // Check parent container visibility for sub-screen elements
                let parentVisible = true;
                let parentInfo = {};
                if (requiresSubScreenChange) {
                    const subScreen = document.getElementById(`blacklist-${subScreenName}`);
                    if (subScreen) {
                        const parentStyle = window.getComputedStyle(subScreen);
                        parentVisible = parentStyle.display !== 'none' && 
                                       parentStyle.visibility !== 'hidden' &&
                                       parentStyle.opacity !== '0';
                        parentInfo = {
                            display: parentStyle.display,
                            visibility: parentStyle.visibility,
                            opacity: parentStyle.opacity,
                            isVisible: parentVisible
                        };
                    }
                }

                const elementVisible = rect.width > 0 && 
                                 rect.height > 0 && 
                                 computedStyle.display !== 'none' &&
                                 computedStyle.visibility !== 'hidden' &&
                                 computedStyle.opacity !== '0';

                const isVisible = elementVisible && parentVisible;

                console.log(`[Tutorial] Final visibility check:`, {
                    elementRect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
                    elementStyle: {
                        display: computedStyle.display,
                        visibility: computedStyle.visibility,
                        opacity: computedStyle.opacity
                    },
                    elementVisible: elementVisible,
                    parentInfo: parentInfo,
                    parentVisible: parentVisible,
                    isVisible: isVisible,
                    retryCount: retryCount
                });

                if (!isVisible && retryCount < 2) {
                    console.warn(`[Tutorial] Element not visible, retrying... (retry ${retryCount + 1})`);
                    // Retry after a short delay if element is not yet visible
                    setTimeout(() => this.showStep(retryCount + 1), 300);
                    return;
                }

                // If still not visible after retries, proceed anyway (element might be off-screen)
                if (!isVisible) {
                    console.warn('[Tutorial] Element may not be fully visible, proceeding anyway:', step.element);
                } else {
                    console.log('[Tutorial] Element is visible, proceeding with tutorial step');
                }

                // Scroll element into view before showing tooltip
                this.scrollToElement(element, step);
                
                // Wait for scroll to complete, then use requestAnimationFrame for positioning
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        console.log('[Tutorial] Showing highlight and tooltip');
                        this.highlightElement(element, step);
                        this.showTooltip(element, step);
                        this.updateProgress();
                        this.updateButtons();
                    });
                }, 100);
            });
        }, initialTimeout);
    }

    scrollToElement(element, step) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Calculate desired position based on tooltip position
        let targetY = window.pageYOffset + rect.top;
        let targetX = window.pageXOffset + rect.left;
        
        // Adjust based on tooltip position preference
        switch (step.position) {
            case 'top':
                // Position element in upper part of viewport
                targetY = window.pageYOffset + rect.top - (viewportHeight * 0.3);
                break;
            case 'bottom':
                // Position element in lower part of viewport
                targetY = window.pageYOffset + rect.top - (viewportHeight * 0.5);
                break;
            case 'left':
            case 'right':
                // Center vertically
                targetY = window.pageYOffset + rect.top - (viewportHeight * 0.4);
                break;
            default:
                // Center vertically
                targetY = window.pageYOffset + rect.top - (viewportHeight * 0.4);
        }
        
        // Ensure we don't scroll beyond page boundaries
        const maxScrollY = document.documentElement.scrollHeight - viewportHeight;
        targetY = Math.max(0, Math.min(targetY, maxScrollY));
        
        // Scroll to position
        window.scrollTo({
            top: targetY,
            left: targetX,
            behavior: 'smooth'
        });
    }

    highlightElement(element, step) {
        const overlay = document.getElementById('tutorial-overlay');
        const highlight = document.getElementById('tutorial-highlight');

        if (!overlay || !highlight) return;

        overlay.classList.add('active');

        // Recalculate positions dynamically using requestAnimationFrame
        requestAnimationFrame(() => {
            // Ensure element is visible
            if (!element || (!element.offsetParent && element.style.display === 'none')) {
                return;
            }

            // Use getBoundingClientRect for viewport-relative positioning
            const rect = element.getBoundingClientRect();

            highlight.style.width = `${rect.width}px`;
            highlight.style.height = `${rect.height}px`;
            highlight.style.left = `${rect.left}px`;
            highlight.style.top = `${rect.top}px`;
        });
    }

    showTooltip(element, step) {
        const tooltip = document.getElementById('tutorial-tooltip');
        const title = document.getElementById('tutorial-title');
        const text = document.getElementById('tutorial-text');
        const arrow = document.getElementById('tutorial-arrow');

        if (!tooltip || !title || !text || !arrow) return;

        // Update content first
        title.textContent = step.title;
        text.textContent = step.text;

        // Make tooltip visible to calculate its dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';

        // Use requestAnimationFrame to wait for DOM to update and tooltip to be rendered
        requestAnimationFrame(() => {
            // Calculate dimensions AFTER content is updated and tooltip is rendered
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const spacing = 16;

            // Remove all arrow classes and reset arrow styles
            arrow.className = 'tutorial-arrow';
            arrow.style.left = '';
            arrow.style.top = '';
            arrow.style.right = '';
            arrow.style.bottom = '';

            // 1. Calculate initial tooltip position based on step.position
            let top, left;

            switch (step.position) {
                case 'top':
                    top = rect.top - tooltipRect.height - spacing;
                    left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'bottom':
                    top = rect.bottom + spacing;
                    left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'left':
                    top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                    left = rect.left - tooltipRect.width - spacing;
                    break;
                case 'right':
                    top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                    left = rect.right + spacing;
                    break;
                default:
                    top = rect.bottom + spacing;
                    left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            }

            // 2. Keep tooltip within viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (left < 16) left = 16;
            if (left + tooltipRect.width > viewportWidth - 16) {
                left = viewportWidth - tooltipRect.width - 16;
            }

            if (top < 16) {
                top = rect.bottom + spacing;
            }
            if (top + tooltipRect.height > viewportHeight - 16) {
                top = rect.top - tooltipRect.height - spacing;
            }

            // 3. Apply position to tooltip
            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
            tooltip.style.visibility = 'visible';

            // 4. DOPO aver posizionato il tooltip, calcola orientamento freccia
            // basandosi sulla posizione FINALE del tooltip rispetto all'elemento
            const tooltipCenterX = left + tooltipRect.width / 2;
            const tooltipCenterY = top + tooltipRect.height / 2;
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;

            // Calculate distances from each side of tooltip to element
            const distTop = Math.abs((top + tooltipRect.height) - rect.top);
            const distBottom = Math.abs(rect.bottom - top);
            const distLeft = Math.abs((left + tooltipRect.width) - rect.left);
            const distRight = Math.abs(rect.right - left);

            // Find the closest side
            const minDist = Math.min(distTop, distBottom, distLeft, distRight);
            const arrowSize = 8; // Size of arrow border

            if (minDist === distTop) {
                // Tooltip is above element, arrow points down (bottom)
                arrow.className = 'tutorial-arrow bottom';
                // Position arrow horizontally centered relative to element center
                const arrowLeft = elementCenterX - left - arrowSize;
                arrow.style.left = `${Math.max(arrowSize, Math.min(arrowLeft, tooltipRect.width - arrowSize * 2))}px`;
                arrow.style.transform = 'translateX(0)';
                arrow.style.top = '';
                arrow.style.right = '';
                arrow.style.bottom = '';
            } else if (minDist === distBottom) {
                // Tooltip is below element, arrow points up (top)
                arrow.className = 'tutorial-arrow top';
                // Position arrow horizontally centered relative to element center
                const arrowLeft = elementCenterX - left - arrowSize;
                arrow.style.left = `${Math.max(arrowSize, Math.min(arrowLeft, tooltipRect.width - arrowSize * 2))}px`;
                arrow.style.transform = 'translateX(0)';
                arrow.style.top = '';
                arrow.style.right = '';
                arrow.style.bottom = '';
            } else if (minDist === distLeft) {
                // Tooltip is to the left of element, arrow points right
                arrow.className = 'tutorial-arrow right';
                // Position arrow vertically centered relative to element center
                const arrowTop = elementCenterY - top - arrowSize;
                arrow.style.top = `${Math.max(arrowSize, Math.min(arrowTop, tooltipRect.height - arrowSize * 2))}px`;
                arrow.style.transform = 'translateY(0)';
                arrow.style.left = '';
                arrow.style.right = '';
                arrow.style.bottom = '';
            } else {
                // Tooltip is to the right of element, arrow points left
                arrow.className = 'tutorial-arrow left';
                // Position arrow vertically centered relative to element center
                const arrowTop = elementCenterY - top - arrowSize;
                arrow.style.top = `${Math.max(arrowSize, Math.min(arrowTop, tooltipRect.height - arrowSize * 2))}px`;
                arrow.style.transform = 'translateY(0)';
                arrow.style.left = '';
                arrow.style.right = '';
                arrow.style.bottom = '';
            }
        });
    }

    updateProgress() {
        const progressBar = document.getElementById('tutorial-progress');
        if (progressBar) {
            const progress = ((this.currentStep + 1) / this.steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    updateButtons() {
        const prevBtn = document.getElementById('tutorial-prev');
        const nextBtn = document.getElementById('tutorial-next');
        const translationManager = window.translationManager;

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 0;
        }

        if (nextBtn) {
            if (this.currentStep === this.steps.length - 1) {
                nextBtn.textContent = translationManager ? translationManager.getTranslation('tutorial.finish') : 'Finish';
            } else {
                nextBtn.textContent = translationManager ? translationManager.getTranslation('tutorial.next') : 'Next';
            }
        }
    }

    hideOverlay() {
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    recalculatePositions() {
        if (!this.isActive) return;
        
        const step = this.steps[this.currentStep];
        if (!step) return;

        requestAnimationFrame(() => {
            const element = document.querySelector(step.element);
            if (!element) return;

            // Recalculate highlight and tooltip positions
            this.highlightElement(element, step);
            this.showTooltip(element, step);
        });
    }

}

// ============================================
// Screen Manager
// ============================================
class ScreenManager {
    constructor() {
        this.currentScreen = 'home';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showScreen('home');
    }

    setupEventListeners() {
        const navButtons = document.querySelectorAll('.screen-nav-btn');
        navButtons.forEach(btn => {
            // Remove existing listeners to avoid duplicates
            btn.removeEventListener('click', this.handleNavClick);
            // Add new listener
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const screen = btn.dataset.screen;
                if (screen) {
                    this.showScreen(screen);
                }
            });
        });
    }

    showScreen(screenName) {
        if (!screenName) {
            console.warn('showScreen called without screenName');
            return;
        }

        // Hide all screens
        const screens = document.querySelectorAll('.app-screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
            // Reset animation flags for all elements in hidden screens
            const animatedElements = screen.querySelectorAll('[data-animated]');
            animatedElements.forEach(el => {
                delete el.dataset.animated;
            });
        });

        // Show selected screen
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if (!targetScreen) {
            console.warn(`Screen not found: screen-${screenName}`);
            return;
        }
        targetScreen.classList.add('active');

        // Update nav buttons
        const navButtons = document.querySelectorAll('.screen-nav-btn');
        navButtons.forEach(btn => {
            if (btn.dataset.screen === screenName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Show/hide blacklist sub-nav
        const subNav = document.getElementById('blacklist-sub-nav');
        if (subNav) {
            if (screenName === 'blacklist') {
                subNav.style.display = 'flex';
                // Show first sub-screen (countries) when showing blacklist
                // BUT NOT if tutorial is active (tutorial manages sub-screen changes)
                setTimeout(() => {
                    // Skip forcing 'countries' if tutorial is active
                    if (window.tutorialManager && window.tutorialManager.isActive) {
                        console.log('[ScreenManager] Tutorial is active, skipping auto-show countries');
                        return;
                    }
                    
                    if (window.blacklistManager) {
                        window.blacklistManager.showSubScreen('countries');
                    } else {
                        // Fallback: manually show first sub-screen
                        const firstSubScreen = document.getElementById('blacklist-countries');
                        if (firstSubScreen) {
                            document.querySelectorAll('.blacklist-sub-screen').forEach(s => s.classList.remove('active'));
                            firstSubScreen.classList.add('active');
                            document.querySelectorAll('.blacklist-sub-nav-btn').forEach(btn => {
                                btn.classList.remove('active');
                                if (btn.dataset.subscreen === 'countries') {
                                    btn.classList.add('active');
                                }
                            });
                        }
                    }
                }, 50);
            } else {
                subNav.style.display = 'none';
                // Hide all sub-screens when leaving blacklist
                const subScreens = document.querySelectorAll('.blacklist-sub-screen');
                subScreens.forEach(screen => {
                    screen.classList.remove('active');
                });
            }
        }

        this.currentScreen = screenName;

        // Trigger animations for the new screen after it's visible
        setTimeout(() => {
            this.animateScreen(screenName);
        }, 300);
    }

    animateScreen(screenName) {
        switch (screenName) {
            case 'home':
                animateHomeScreen();
                break;
            case 'whitelist':
                animateWhitelistScreen();
                break;
            case 'blacklist':
                if (window.blacklistManager) {
                    window.blacklistManager.animateCurrentSubScreen();
                }
                break;
            case 'statistics':
                animateStatisticsScreen();
                break;
        }
    }
}

// ============================================
// Blacklist Manager
// ============================================
class BlacklistManager {
    constructor() {
        this.currentSubScreen = 'countries';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSubScreen('countries');
    }

    setupEventListeners() {
        // Use event delegation to handle clicks even if buttons are added dynamically
        const subNav = document.getElementById('blacklist-sub-nav');
        if (subNav) {
            subNav.addEventListener('click', (e) => {
                const btn = e.target.closest('.blacklist-sub-nav-btn');
                if (btn) {
                    e.preventDefault();
                    e.stopPropagation();
                    const subScreen = btn.dataset.subscreen;
                    if (subScreen) {
                        this.showSubScreen(subScreen);
                    }
                }
            });
        }
    }

    showSubScreen(subScreenName) {
        // Debug: Log the call
        console.log('[BlacklistManager] showSubScreen called with:', subScreenName);
        
        // Ensure blacklist screen is visible first
        const blacklistScreen = document.getElementById('screen-blacklist');
        if (!blacklistScreen) {
            console.error('[BlacklistManager] Blacklist screen not found');
            return;
        }
        
        const isBlacklistActive = blacklistScreen.classList.contains('active');
        console.log('[BlacklistManager] Blacklist screen active?', isBlacklistActive);
        
        // Always ensure blacklist screen is active, even if it appears to be
        if (!isBlacklistActive && window.screenManager) {
            console.log('[BlacklistManager] Switching to blacklist screen first...');
            window.screenManager.showScreen('blacklist');
            // Wait for screen transition and sub-nav to be visible
            setTimeout(() => {
                console.log('[BlacklistManager] Screen transition complete, showing sub-screen...');
                this._doShowSubScreen(subScreenName);
            }, 500);
        } else {
            // Screen is already visible, but ensure sub-nav is visible too
            const subNav = document.getElementById('blacklist-sub-nav');
            if (subNav) {
                subNav.style.display = 'flex';
            }
            // Show sub-screen immediately
            this._doShowSubScreen(subScreenName);
        }
    }

    _doShowSubScreen(subScreenName) {
        console.log('[BlacklistManager] _doShowSubScreen called with:', subScreenName);
        
        // Ensure blacklist screen is active
        const blacklistScreen = document.getElementById('screen-blacklist');
        if (!blacklistScreen) {
            console.error('[BlacklistManager] Blacklist screen element not found');
            return;
        }
        
        if (!blacklistScreen.classList.contains('active')) {
            blacklistScreen.classList.add('active');
        }
        
        // Ensure sub-nav is visible
        const subNav = document.getElementById('blacklist-sub-nav');
        if (subNav) {
            subNav.style.display = 'flex';
        }
        
        // Find target sub-screen
        const targetSubScreen = document.getElementById(`blacklist-${subScreenName}`);
        if (!targetSubScreen) {
            console.error('[BlacklistManager] Sub-screen not found: blacklist-' + subScreenName);
            return;
        }
        
        // Hide all sub-screens first
        const subScreens = document.querySelectorAll('.blacklist-sub-screen');
        subScreens.forEach(screen => {
            screen.classList.remove('active');
            // Reset animation flags for hidden sub-screens
            const animatedElements = screen.querySelectorAll('[data-animated]');
            animatedElements.forEach(el => {
                delete el.dataset.animated;
            });
        });
        
        // Show target sub-screen
        targetSubScreen.classList.add('active');
        
        // Update sub-nav buttons
        const subNavButtons = document.querySelectorAll('.blacklist-sub-nav-btn');
        subNavButtons.forEach(btn => {
            if (btn.dataset.subscreen === subScreenName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.currentSubScreen = subScreenName;
        
        // Trigger animations after sub-screen is visible
        setTimeout(() => {
            this.animateCurrentSubScreen();
        }, 100);
    }

    animateCurrentSubScreen() {
        switch (this.currentSubScreen) {
            case 'countries':
                animateCountriesScreen();
                break;
            case 'numbers':
                animateNumbersScreen();
                break;
            case 'settings':
                animateSettingsScreen();
                break;
        }
    }
}

// ============================================
// Animation Functions
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

function animateProgressBar(element, target, duration = 2000) {
    element.style.width = '0%';
    setTimeout(() => {
        element.style.width = `${target}%`;
    }, 100);
}

function animateHomeScreen() {
    // Check if screen is visible
    const homeScreen = document.getElementById('screen-home');
    if (!homeScreen || !homeScreen.classList.contains('active')) {
        return;
    }

    // Animate protection switch
    const protectionSwitch = document.getElementById('switch-protection');
    if (protectionSwitch && !protectionSwitch.dataset.animated) {
        setTimeout(() => {
            if (protectionSwitch.checked !== true) {
                protectionSwitch.checked = true;
                protectionSwitch.dispatchEvent(new Event('change'));
            }
            protectionSwitch.dataset.animated = 'true';
        }, 500);
    }

    // Animate stats counters
    const todayBlocked = document.querySelector('#screen-home .stats-number[data-target="12"]');
    const totalBlocked = document.querySelector('#screen-home .stats-number[data-target="1247"]');

    if (todayBlocked && !todayBlocked.dataset.animated) {
        animateCounter(todayBlocked, 12);
        todayBlocked.dataset.animated = 'true';
    }

    if (totalBlocked && !totalBlocked.dataset.animated) {
        animateCounter(totalBlocked, 1247);
        totalBlocked.dataset.animated = 'true';
    }

    // Animate progress bars
    const progressBars = document.querySelectorAll('#screen-home .progress-fill');
    progressBars.forEach((bar, index) => {
        if (!bar.dataset.animated) {
            const progress = bar.dataset.progress || '0';
            setTimeout(() => {
                animateProgressBar(bar, parseInt(progress), 1500);
            }, index * 200);
            bar.dataset.animated = 'true';
        }
    });

    // Animate activity items
    const activityItems = document.querySelectorAll('#screen-home .activity-item');
    activityItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function animateWhitelistScreen() {
    // Check if screen is visible
    const whitelistScreen = document.getElementById('screen-whitelist');
    if (!whitelistScreen || !whitelistScreen.classList.contains('active')) {
        return;
    }

    // Simulate typing in search
    const searchInput = document.getElementById('whitelist-search');
    if (searchInput && !searchInput.dataset.animated) {
        simulateTyping(searchInput, 'John', () => {
            setTimeout(() => {
                searchInput.value = '';
                searchInput.dataset.animated = 'true';
            }, 2000);
        });
    }

    // Animate allow contacts switch
    const allowSwitch = document.getElementById('switch-allow-contacts');
    if (allowSwitch && !allowSwitch.dataset.animated) {
        setTimeout(() => {
            if (allowSwitch.checked !== true) {
                allowSwitch.checked = true;
                allowSwitch.dispatchEvent(new Event('change'));
            }
            allowSwitch.dataset.animated = 'true';
        }, 1000);
    }

    // Animate whitelist items
    const whitelistItems = document.querySelectorAll('#screen-whitelist .whitelist-item');
    whitelistItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function animateStatisticsScreen() {
    // Check if screen is visible
    const statsScreen = document.getElementById('screen-statistics');
    if (!statsScreen || !statsScreen.classList.contains('active')) {
        return;
    }

    // Animate stats counters
    const todayStats = document.querySelector('#screen-statistics .stats-small-number[data-target="12"]');
    const totalStats = document.querySelector('#screen-statistics .stats-small-number[data-target="1247"]');

    if (todayStats && !todayStats.dataset.animated) {
        animateCounter(todayStats, 12);
        todayStats.dataset.animated = 'true';
    }

    if (totalStats && !totalStats.dataset.animated) {
        animateCounter(totalStats, 1247);
        totalStats.dataset.animated = 'true';
    }

    // Animate chart
    const chart = document.getElementById('activity-chart');
    if (chart && !chart.dataset.animated) {
        // Get current active period chip
        const activeChip = document.querySelector('.period-chip.active');
        const period = activeChip ? (activeChip.dataset.period || 'daily') : 'daily';
        animateChart(chart, period);
        chart.dataset.animated = 'true';
    }

    // Animate origin items
    const originItems = document.querySelectorAll('#screen-statistics .origin-item');
    originItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate block items
    const blockItems = document.querySelectorAll('#screen-statistics .block-item');
    blockItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function animateCountriesScreen() {
    // Check if sub-screen is visible
    const countriesSubScreen = document.getElementById('blacklist-countries');
    if (!countriesSubScreen || !countriesSubScreen.classList.contains('active')) {
        return;
    }

    // Simulate typing in search
    const searchInput = document.getElementById('countries-search');
    if (searchInput && !searchInput.dataset.animated) {
        simulateTyping(searchInput, 'United', () => {
            setTimeout(() => {
                searchInput.value = '';
                searchInput.dataset.animated = 'true';
            }, 2000);
        });
    }

    // Animate country toggles
    const countryItems = document.querySelectorAll('#blacklist-countries .country-item');
    countryItems.forEach((item, index) => {
        if (!item.dataset.animated) {
            setTimeout(() => {
                toggleCountryStatus(item);
                setTimeout(() => {
                    toggleCountryStatus(item);
                }, 1000);
                item.dataset.animated = 'true';
            }, index * 300);
        }
    });
}

function animateNumbersScreen() {
    // Check if sub-screen is visible
    const numbersSubScreen = document.getElementById('blacklist-numbers');
    if (!numbersSubScreen || !numbersSubScreen.classList.contains('active')) {
        return;
    }

    // Simulate typing in search
    const searchInput = document.getElementById('numbers-search');
    if (searchInput && !searchInput.dataset.animated) {
        simulateTyping(searchInput, '+1', () => {
            setTimeout(() => {
                searchInput.value = '';
                searchInput.dataset.animated = 'true';
            }, 2000);
        });
    }

    // Animate number items
    const numberItems = document.querySelectorAll('#blacklist-numbers .whitelist-item');
    numberItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate FAB pulse
    const fab = document.getElementById('fab-add-number');
    if (fab) {
        fab.classList.add('pulse');
    }
}

function animateSettingsScreen() {
    // Check if sub-screen is visible
    const settingsSubScreen = document.getElementById('blacklist-settings');
    if (!settingsSubScreen || !settingsSubScreen.classList.contains('active')) {
        return;
    }

    // Animate switches
    const unknownNumbersSwitch = document.getElementById('switch-unknown-numbers');
    const unknownCountriesSwitch = document.getElementById('switch-unknown-countries');

    if (unknownNumbersSwitch && !unknownNumbersSwitch.dataset.animated) {
        setTimeout(() => {
            if (unknownNumbersSwitch.checked !== true) {
                unknownNumbersSwitch.checked = true;
                unknownNumbersSwitch.dispatchEvent(new Event('change'));
            }
            unknownNumbersSwitch.dataset.animated = 'true';
        }, 500);
    }

    if (unknownCountriesSwitch && !unknownCountriesSwitch.dataset.animated) {
        setTimeout(() => {
            if (unknownCountriesSwitch.checked !== true) {
                unknownCountriesSwitch.checked = true;
                unknownCountriesSwitch.dispatchEvent(new Event('change'));
            }
            unknownCountriesSwitch.dataset.animated = 'true';
        }, 1000);
    }
}

function simulateTyping(input, text, callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            input.value = text.substring(0, index + 1);
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 100);
}

function animateChart(canvas, period = 'daily') {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Generate data based on period
    let data = [];
    let total = 0;
    
    switch (period) {
        case 'daily':
            // 7 days of data (last 7 days)
            data = [8, 12, 15, 10, 18, 22, 14];
            total = data.reduce((a, b) => a + b, 0);
            break;
        case 'weekly':
            // 4 weeks of data (last 4 weeks)
            data = [45, 62, 58, 71];
            total = data.reduce((a, b) => a + b, 0);
            break;
        case 'monthly':
            // 6 months of data (last 6 months)
            data = [180, 220, 195, 240, 210, 235];
            total = data.reduce((a, b) => a + b, 0);
            break;
        default:
            data = [12, 19, 15, 25, 22, 30, 28];
            total = data.reduce((a, b) => a + b, 0);
    }

    const maxValue = Math.max(...data, 1); // Avoid division by zero
    const barWidth = chartWidth / data.length;
    const barSpacing = barWidth * 0.3;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#CAC4D0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Animate bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barSpacing / 2;
        const y = height - padding - barHeight;

        setTimeout(() => {
            ctx.fillStyle = '#6750A4';
            ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        }, index * 150);
    });

    // Update total
    const totalElement = document.getElementById('chart-total');
    if (totalElement) {
        totalElement.textContent = `Total: ${total}`;
    }
}

// ============================================
// Interactive Features
// ============================================
function setupInteractions() {
    // Protection toggle functionality
    const protectionSwitch = document.getElementById('switch-protection');
    if (protectionSwitch) {
        protectionSwitch.addEventListener('change', (e) => {
            updateProtectionCard(e.target.checked);
        });
    }

    // Quick Actions click simulation
    const quickActionCards = document.querySelectorAll('.quick-action-card');
    quickActionCards.forEach(card => {
        // Use event delegation or ensure single listener
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const action = this.dataset.action;
            
            if (window.screenManager) {
                switch (action) {
                    case 'whitelist':
                        window.screenManager.showScreen('whitelist');
                        break;
                    case 'countries':
                        window.screenManager.showScreen('blacklist');
                        setTimeout(() => {
                            if (window.blacklistManager) {
                                window.blacklistManager.showSubScreen('countries');
                            }
                        }, 350);
                        break;
                    case 'numbers':
                        window.screenManager.showScreen('blacklist');
                        setTimeout(() => {
                            if (window.blacklistManager) {
                                window.blacklistManager.showSubScreen('numbers');
                            }
                        }, 350);
                        break;
                    case 'settings':
                        window.screenManager.showScreen('blacklist');
                        setTimeout(() => {
                            if (window.blacklistManager) {
                                window.blacklistManager.showSubScreen('settings');
                            }
                        }, 350);
                        break;
                }
            }
        }, { once: false });
    });

    // Period chip switching
    const periodChips = document.querySelectorAll('.period-chip');
    periodChips.forEach(chip => {
        chip.addEventListener('click', () => {
            periodChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Get the period from the chip
            const period = chip.dataset.period || 'daily';

            // Animate chart change with new period
            const chart = document.getElementById('activity-chart');
            if (chart) {
                chart.dataset.animated = 'false';
                animateChart(chart, period);
            }
        });
    });

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            filterCountries(filter);
        });
    });

    // Country toggle icons - make entire card clickable
    const countryItems = document.querySelectorAll('#blacklist-countries .country-item');
    countryItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleCountryStatus(item);
        });
    });

    // FAB for numbers
    const fabNumber = document.getElementById('fab-add-number');
    if (fabNumber) {
        fabNumber.addEventListener('click', () => {
            showEditDialog(null);
        });
    }

    // Edit/Delete buttons for numbers
    const editButtons = document.querySelectorAll('#blacklist-numbers .blacklist-action-btn[aria-label="Edit"]');
    const deleteButtons = document.querySelectorAll('#blacklist-numbers .blacklist-action-btn[aria-label="Delete"]');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const numberItem = btn.closest('.blacklist-number-item');
            if (numberItem) {
                const name = numberItem.querySelector('.blacklist-number-name')?.textContent || '';
                const phone = numberItem.querySelector('.blacklist-number-phone')?.textContent || '';
                showEditDialog({ name, phone });
            }
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const numberItem = btn.closest('.blacklist-number-item');
            if (numberItem) {
                const phone = numberItem.querySelector('.blacklist-number-phone')?.textContent || '';
                showDeleteDialog(phone);
            }
        });
    });

    // Back/Next buttons for Numbers screen
    const numbersBackBtn = document.getElementById('numbers-back-btn');
    const numbersNextBtn = document.getElementById('numbers-next-btn');
    
    if (numbersBackBtn) {
        numbersBackBtn.addEventListener('click', () => {
            if (window.blacklistManager) {
                window.blacklistManager.showSubScreen('countries');
            }
        });
    }
    
    if (numbersNextBtn) {
        numbersNextBtn.addEventListener('click', () => {
            if (window.blacklistManager) {
                window.blacklistManager.showSubScreen('settings');
            }
        });
    }

    // Back button for Settings screen
    const settingsBackBtn = document.getElementById('settings-back-btn');
    if (settingsBackBtn) {
        settingsBackBtn.addEventListener('click', () => {
            if (window.blacklistManager) {
                window.blacklistManager.showSubScreen('numbers');
            }
        });
    }

    // Block All / Allow All buttons
    const blockAllBtn = document.getElementById('btn-block-all');
    const allowAllBtn = document.getElementById('btn-allow-all');

    if (blockAllBtn) {
        blockAllBtn.addEventListener('click', () => {
            const allCountryItems = document.querySelectorAll('#blacklist-countries .country-item');
            allCountryItems.forEach(item => {
                item.dataset.status = 'blocked';
                updateCountryIcon(item);
            });
        });
    }

    if (allowAllBtn) {
        allowAllBtn.addEventListener('click', () => {
            const allCountryItems = document.querySelectorAll('#blacklist-countries .country-item');
            allCountryItems.forEach(item => {
                item.dataset.status = 'allowed';
                updateCountryIcon(item);
            });
        });
    }


    // Chart navigation
    const chartPrev = document.getElementById('chart-prev');
    const chartNext = document.getElementById('chart-next');
    const chartPeriod = document.getElementById('chart-period');

    if (chartPrev) {
        chartPrev.addEventListener('click', () => {
            // Update period label (simplified)
            if (chartPeriod) {
                // Could implement actual date navigation
            }
        });
    }

    if (chartNext) {
        chartNext.addEventListener('click', () => {
            // Update period label (simplified)
            if (chartPeriod) {
                // Could implement actual date navigation
            }
        });
    }

    // Whitelist search
    const whitelistSearch = document.getElementById('whitelist-search');
    if (whitelistSearch) {
        whitelistSearch.addEventListener('input', debounce((e) => {
            filterWhitelist(e.target.value);
        }, 300));
    }

    // Countries search
    const countriesSearch = document.getElementById('countries-search');
    if (countriesSearch) {
        countriesSearch.addEventListener('input', debounce((e) => {
            filterCountriesSearch(e.target.value);
        }, 300));
    }

    // Numbers search
    const numbersSearch = document.getElementById('numbers-search');
    if (numbersSearch) {
        numbersSearch.addEventListener('input', debounce((e) => {
            filterNumbers(e.target.value);
        }, 300));
    }
}

function updateProtectionCard(isEnabled) {
    const statusDot = document.getElementById('status-dot');
    const statusLabel = document.getElementById('status-label');
    const protectionTitle = document.getElementById('protection-title');
    const protectionDescription = document.getElementById('protection-description');
    const translationManager = window.translationManager;

    if (isEnabled) {
        if (statusDot) {
            statusDot.classList.add('pulse');
            statusDot.style.backgroundColor = '#4CAF50';
        }
        if (statusLabel) {
            statusLabel.textContent = translationManager ? translationManager.getTranslation('appScreens.home.statusEnabled') : 'ENABLED';
            statusLabel.style.color = 'var(--primary)';
        }
        if (protectionTitle) {
            protectionTitle.textContent = translationManager ? translationManager.getTranslation('appScreens.home.protectionTitle') : 'Active Protection';
        }
        if (protectionDescription) {
            protectionDescription.textContent = translationManager ? translationManager.getTranslation('appScreens.home.protectionDescription') : 'Spam calls are being automatically blocked.';
        }
    } else {
        if (statusDot) {
            statusDot.classList.remove('pulse');
            statusDot.style.backgroundColor = '#BA1A1A';
        }
        if (statusLabel) {
            statusLabel.textContent = translationManager ? translationManager.getTranslation('appScreens.home.statusDisabled') : 'DISABLED';
            statusLabel.style.color = '#BA1A1A';
        }
        if (protectionTitle) {
            protectionTitle.textContent = translationManager ? translationManager.getTranslation('appScreens.home.protectionTitleInactive') : 'Inactive Protection';
        }
        if (protectionDescription) {
            protectionDescription.textContent = translationManager ? translationManager.getTranslation('appScreens.home.protectionDescriptionInactive') : 'Call blocking is currently disabled. Enable protection to block unwanted calls.';
        }
    }
}

function filterWhitelist(searchTerm) {
    const whitelistItems = document.querySelectorAll('#screen-whitelist .whitelist-item');
    const term = searchTerm.toLowerCase().trim();
    
    whitelistItems.forEach(item => {
        const name = item.querySelector('.whitelist-name')?.textContent.toLowerCase() || '';
        const number = item.querySelector('.whitelist-number')?.textContent.toLowerCase() || '';
        
        if (term === '' || name.includes(term) || number.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterCountriesSearch(searchTerm) {
    const countryItems = document.querySelectorAll('#blacklist-countries .country-item');
    const term = searchTerm.toLowerCase().trim();
    
    countryItems.forEach(item => {
        const name = item.querySelector('.country-name')?.textContent.toLowerCase() || '';
        const code = item.querySelector('.country-code')?.textContent.toLowerCase() || '';
        
        if (term === '' || name.includes(term) || code.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterNumbers(searchTerm) {
    const numberItems = document.querySelectorAll('#blacklist-numbers .blacklist-number-item');
    const term = searchTerm.toLowerCase().trim();
    
    numberItems.forEach(item => {
        const name = item.querySelector('.blacklist-number-name')?.textContent.toLowerCase() || '';
        const phone = item.querySelector('.blacklist-number-phone')?.textContent.toLowerCase() || '';
        
        if (term === '' || name.includes(term) || phone.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function toggleCountryStatus(countryItem) {
    const currentStatus = countryItem.dataset.status;
    const newStatus = currentStatus === 'allowed' ? 'blocked' : 'allowed';
    countryItem.dataset.status = newStatus;
    updateCountryIcon(countryItem);
}

function updateCountryIcon(countryItem) {
    const iconContainer = countryItem.querySelector('.country-toggle-icon');
    if (!iconContainer) return;
    
    const status = countryItem.dataset.status;
    const isAllowed = status === 'allowed';
    
    // Create check circle icon (green) for allowed, block icon (red) for blocked
    if (isAllowed) {
        iconContainer.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#16A34A"/>
            </svg>
        `;
    } else {
        iconContainer.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM18 13H6V11H18V13Z" fill="#DC2626"/>
            </svg>
        `;
    }
}

function filterCountries(filter) {
    const countryItems = document.querySelectorAll('#blacklist-countries .country-item');
    countryItems.forEach(item => {
        const status = item.dataset.status;
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'blocked' && status === 'blocked') {
            item.style.display = 'flex';
        } else if (filter === 'allowed' && status === 'allowed') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// ============================================
// Dialog Functions
// ============================================
function showEditDialog(entry) {
    const overlay = document.getElementById('dialog-edit-overlay');
    const title = document.getElementById('dialog-edit-title');
    const phoneInput = document.getElementById('dialog-edit-phone');
    const nameInput = document.getElementById('dialog-edit-name');
    const saveBtn = document.getElementById('dialog-edit-save');
    const cancelBtn = document.getElementById('dialog-edit-cancel');
    const translationManager = window.translationManager;
    
    if (!overlay) return;
    
    // Set title and prefill if editing
    if (entry) {
        title.textContent = translationManager ? translationManager.getTranslation('dialogs.edit.title') : 'Edit';
        phoneInput.value = entry.phone || '';
        nameInput.value = entry.name || '';
    } else {
        title.textContent = translationManager ? translationManager.getTranslation('dialogs.edit.titleAdd') : 'Add to Blacklist';
        phoneInput.value = '';
        nameInput.value = '';
    }
    
    // Show overlay
    overlay.classList.add('active');
    
    // Close handlers
    const closeDialog = () => {
        overlay.classList.remove('active');
    };
    
    cancelBtn?.addEventListener('click', closeDialog, { once: true });
    saveBtn?.addEventListener('click', () => {
        // Just close, don't actually save
        closeDialog();
    }, { once: true });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDialog();
        }
    }, { once: true });
}

function showDeleteDialog(phoneNumber) {
    const overlay = document.getElementById('dialog-delete-overlay');
    const message = document.getElementById('dialog-delete-message');
    const confirmBtn = document.getElementById('dialog-delete-confirm');
    const cancelBtn = document.getElementById('dialog-delete-cancel');
    const translationManager = window.translationManager;
    
    if (!overlay) return;
    
    // Set message
    if (message) {
        const baseMessage = translationManager ? translationManager.getTranslation('dialogs.delete.message') : 'Are you sure you want to delete this number from your blacklist?';
        // Replace placeholder with actual phone number
        message.textContent = baseMessage.replace('this number', phoneNumber).replace('questo numero', phoneNumber);
    }
    
    // Show overlay
    overlay.classList.add('active');
    
    // Close handlers
    const closeDialog = () => {
        overlay.classList.remove('active');
    };
    
    cancelBtn?.addEventListener('click', closeDialog, { once: true });
    confirmBtn?.addEventListener('click', () => {
        // Just close, don't actually delete
        closeDialog();
    }, { once: true });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDialog();
        }
    }, { once: true });
}

// ============================================
// Utility Functions
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CTA Buttons
// ============================================
function setupCTAs() {
    const downloadBtns = document.querySelectorAll('#btn-download, #btn-download-cta');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Replace with actual Google Play Store link
            window.open('https://play.google.com/store/apps/details?id=com.callshield', '_blank');
        });
    });

    const learnMoreBtn = document.getElementById('btn-learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('.app-screens-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============================================
// Intersection Observer for Animations
// ============================================
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// Dark Mode Toggle
// ============================================
function setupDarkMode() {
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    if (!darkModeSwitch) return;
    
    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }
    
    // Toggle dark mode
    darkModeSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Translation Manager
    window.translationManager = new TranslationManager();
    
    // Initialize managers
    window.screenManager = new ScreenManager();
    window.blacklistManager = new BlacklistManager();
    window.tutorialManager = new TutorialManager();

    // Setup dark mode
    setupDarkMode();

    // Setup interactions
    setupInteractions();
    setupCTAs();
    setupIntersectionObserver();

    // Initial animations - wait a bit for DOM to be ready
    setTimeout(() => {
        animateHomeScreen();
    }, 500);

    // Handle window resize for tutorial
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.tutorialManager && window.tutorialManager.isActive) {
                window.tutorialManager.recalculatePositions();
            }
        }, 250);
    });
});

