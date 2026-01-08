// ============================================
// Translations for CallShield Landing Page
// ============================================

const translations = {
    en: {
        meta: {
            title: "CallShield - Advanced Call Blocking for Android",
            description: "CallShield - Block unwanted calls with advanced filtering. 100% Private, Unlimited Blocks, 24/7 Protection."
        },
        hero: {
            title: "CallShield",
            subtitle: "Mobile application for advanced call blocking. Block spam, telemarketing, and unwanted calls with powerful filtering tools.",
            downloadBtn: "Download on Google Play",
            iosComingSoon: "iOS coming soon",
            learnMoreBtn: "Learn More",
            statPrivate: "100% Private",
            statUnlimited: "Unlimited Blocks",
            statProtection: "24/7 Protection"
        },
        features: {
            title: "Features",
            whitelist: {
                title: "Whitelist Management",
                description: "Control which numbers can always reach you. Sync contacts automatically or add numbers manually."
            },
            countryBlocking: {
                title: "Country Blocking",
                description: "Block calls by country of origin. Geo-block unwanted international calls with simple toggles."
            },
            numberBlacklist: {
                title: "Number Blacklist",
                description: "Block specific phone numbers permanently. Add numbers manually or from call history."
            },
            statistics: {
                title: "Statistics & Analytics",
                description: "Track blocked calls with detailed statistics. View activity charts and top blocked countries."
            },
            smartSettings: {
                title: "Smart Settings",
                description: "Customize blocking rules and preferences. Manage advanced filters and configure your blocking preferences."
            },
            realtimeProtection: {
                title: "Real-time Protection",
                description: "Works 24/7 in the background. Blocks calls instantly before they reach you, providing continuous protection."
            }
        },
        privacy: {
            title: "Privacy First",
            localProcessing: {
                title: "100% Local Processing",
                description: "All call blocking happens locally on your device. No data is sent to external servers. Your privacy is guaranteed."
            },
            notDialer: {
                title: "Not a Dialer App",
                description: "CallShield is not a dialer and does not replace your phone's default dialer. It works alongside your existing phone app."
            },
            noContactAccess: {
                title: "Protected Contacts",
                description: "CallShield does not share or acquire information about your contacts. It only processes call notifications locally to determine blocking actions."
            },
            notificationBased: {
                title: "Notification-Based",
                description: "The app works by intercepting call notifications. It doesn't control your phone's dialer or call functions, only filters incoming calls."
            }
        },
        appScreens: {
            startTutorial: "Start Tutorial",
            darkMode: "Dark Mode",
            sectionTitle: "See CallShield in Action",
            sectionSubtitle: "Explore the app interface and learn how to use each feature",
            navHome: "Home",
            navWhitelist: "Whitelist",
            navBlacklist: "Blacklist",
            navStatistics: "Statistics",
            blacklistSubNav: {
                countries: "Countries",
                numbers: "Numbers",
                settings: "Settings"
            },
            home: {
                protectionTitle: "Active Protection",
                protectionDescription: "Spam calls are being automatically blocked.",
                protectionTitleInactive: "Inactive Protection",
                protectionDescriptionInactive: "Call blocking is currently disabled. Enable protection to block unwanted calls.",
                statusEnabled: "ENABLED",
                statusDisabled: "DISABLED",
                statsBlockedToday: "Blocked Today",
                statsTotalBlocked: "Total Blocked",
                quickActions: "Quick Actions",
                whitelistAction: "Whitelist",
                whitelistSubtitle: "Safe numbers",
                countriesAction: "Countries",
                countriesSubtitle: "Geo-block",
                numbersAction: "Numbers",
                numbersSubtitle: "Blacklist",
                settingsAction: "Settings",
                settingsSubtitle: "Rules & Prefs",
                recentActivity: "Recent Activity",
                seeAll: "See All",
                blocked: "Blocked"
            },
            whitelist: {
                searchPlaceholder: "Search whitelist…",
                allowAllContacts: "Allow all contacts",
                allowAllContactsDesc: "Automatically whitelist everyone in your address book.",
                whitelistedNumbers: "WHITELISTED NUMBERS",
                active: "Active"
            },
            statistics: {
                today: "Today",
                total: "Total",
                activity: "Activity",
                daily: "Daily",
                weekly: "Weekly",
                monthly: "Monthly",
                totalLabel: "Total:",
                topOrigins: "Top Origins",
                recentBlocks: "Recent Blocks",
                clearAll: "Clear All"
            },
            blacklist: {
                countries: {
                    title: "Countries",
                    step: "Step 1 of 3",
                    subtitle: "Manage call blocking by region.",
                    searchPlaceholder: "Search countries or codes…",
                    filterAll: "All",
                    filterBlocked: "Blocked",
                    filterAllowed: "Allowed",
                    blockAll: "Block All",
                    allowAll: "Allow All",
                    hint: "Click on the icons to block or unblock countries"
                },
                numbers: {
                    title: "Numbers",
                    step: "Step 2 of 3",
                    subtitle: "Manage blocked phone numbers.",
                    searchPlaceholder: "Search numbers…",
                    footerInfo: "Calls from these numbers will be automatically rejected and logged in your Stats.",
                    addNumber: "Add to blacklist"
                },
                settings: {
                    title: "Settings",
                    step: "Step 3 of 3",
                    unknownNumbers: {
                        title: "Unknown Numbers",
                        description: "Automatically block incoming calls from numbers that are not saved in your contacts list. Use with caution."
                    },
                    unknownCountries: {
                        title: "Unknown Countries",
                        description: "Block calls from numbers that do not have a valid international prefix. This helps prevent spoofed calls."
                    },
                    footerInfo: "Blocked calls will appear in your history but your phone will not ring."
                }
            }
        },
        tutorial: {
            welcome: "Welcome to CallShield",
            skip: "Skip",
            previous: "Previous",
            next: "Next",
            finish: "Finish",
            steps: [
                {
                    title: "Protection Status",
                    text: "This is the main protection card. Toggle the switch to enable or disable call blocking. When enabled, CallShield will automatically block unwanted calls."
                },
                {
                    title: "Statistics",
                    text: "View your blocking statistics here. See how many calls were blocked today and in total. The progress bars show your blocking activity."
                },
                {
                    title: "Quick Actions",
                    text: "Access key features quickly from here. Tap on any card to navigate to Whitelist, Countries, Numbers, or Settings."
                },
                {
                    title: "Recent Activity",
                    text: "See your recently blocked calls here. This helps you track what numbers have been blocked and when."
                },
                {
                    title: "Search Whitelist",
                    text: "Search for numbers in your whitelist. Type to filter the list and find specific contacts quickly."
                },
                {
                    title: "Allow All Contacts",
                    text: "Enable this option to automatically whitelist everyone in your address book. This ensures all your saved contacts can always reach you."
                },
                {
                    title: "Add to Whitelist",
                    text: "You can manually add contacts to your whitelist. View your whitelisted numbers here and manage them individually. Numbers in the whitelist will always be allowed to call you."
                },
                {
                    title: "Activity Chart",
                    text: "View your blocking activity over time. Switch between Daily, Weekly, and Monthly views. Use the navigation arrows to browse different periods."
                },
                {
                    title: "Top Origins",
                    text: "See which countries are sending the most blocked calls. This helps you identify patterns and adjust your blocking settings."
                },
                {
                    title: "Blacklist Navigation",
                    text: "The Blacklist section has three parts: Countries, Numbers, and Settings. Use these tabs to navigate between different blocking options."
                },
                {
                    title: "Filter Countries",
                    text: "Filter countries by status: All, Blocked, or Allowed. This makes it easier to manage large lists of countries."
                },
                {
                    title: "Block Countries",
                    text: "Toggle the switch next to each country to block or allow calls from that region. Green means allowed, red means blocked."
                },
                {
                    title: "Number Blacklist",
                    text: "Add specific phone numbers to always block. These numbers will be blocked regardless of other settings."
                },
                {
                    title: "Blacklist Settings",
                    text: "Configure advanced blocking rules. Block unknown numbers or numbers without international prefix."
                }
            ]
        },
        widgets: {
            sectionTitle: "Home Screen Widgets",
            sectionSubtitle: "Quick access to CallShield controls right from your home screen",
            toggle: {
                name: "Toggle Widget (2x2)",
                description: "Compact widget to quickly enable or disable protection"
            },
            stats: {
                name: "Stats Widget (4x2)",
                description: "Full widget with toggle and blocking statistics"
            },
            statusActive: "ACTIVE",
            statusInactive: "INACTIVE",
            blockedToday: "Blocked Today",
            totalBlocked: "Total Blocked",
            tapToToggle: "Tap to toggle"
        },
        cta: {
            title: "Ready to Block Unwanted Calls?",
            subtitle: "Download CallShield now and take control of your incoming calls",
            downloadBtn: "Download on Google Play",
            iosComingSoon: "iOS coming soon"
        },
        footer: {
            tagline: "Advanced call blocking for Android",
            contact: "Contact",
            copyright: "© 2025 CallShield. All rights reserved."
        },
        dialogs: {
            edit: {
                title: "Edit",
                titleAdd: "Add to Blacklist",
                ariaLabel: "Edit",
                phoneLabel: "Phone Number",
                phonePlaceholder: "+1 (555) 123-4567",
                nameLabel: "Name (Optional)",
                namePlaceholder: "Contact name",
                cancel: "Cancel",
                save: "Save"
            },
            delete: {
                title: "Delete Number?",
                ariaLabel: "Delete",
                message: "Are you sure you want to delete this number from your blacklist?",
                delete: "Delete",
                cancel: "Cancel"
            }
        }
    },
    it: {
        meta: {
            title: "CallShield - Blocco Chiamate Avanzato per Android",
            description: "CallShield - Blocca chiamate indesiderate con filtri avanzati. 100% Privato, Blocchi Illimitati, Protezione 24/7."
        },
        hero: {
            title: "CallShield",
            subtitle: "Applicazione mobile per blocco chiamate avanzato. Blocca spam, telemarketing e chiamate indesiderate con potenti strumenti di filtraggio.",
            downloadBtn: "Scarica su Google Play",
            iosComingSoon: "iOS in arrivo",
            learnMoreBtn: "Scopri di più",
            statPrivate: "100% Privato",
            statUnlimited: "Blocchi Illimitati",
            statProtection: "Protezione 24/7"
        },
        features: {
            title: "Funzionalità",
            whitelist: {
                title: "Gestione Whitelist",
                description: "Controlla quali numeri possono sempre contattarti. Sincronizza i contatti automaticamente o aggiungi numeri manualmente."
            },
            countryBlocking: {
                title: "Blocco per Paese",
                description: "Blocca le chiamate per paese di origine. Blocca chiamate internazionali indesiderate con semplici interruttori."
            },
            numberBlacklist: {
                title: "Blacklist Numeri",
                description: "Blocca numeri di telefono specifici in modo permanente. Aggiungi numeri manualmente o dalla cronologia chiamate."
            },
            statistics: {
                title: "Statistiche e Analisi",
                description: "Traccia le chiamate bloccate con statistiche dettagliate. Visualizza grafici di attività e i paesi più bloccati."
            },
            smartSettings: {
                title: "Impostazioni Intelligenti",
                description: "Personalizza regole e preferenze di blocco. Gestisci filtri avanzati e configura le tue preferenze di blocco."
            },
            realtimeProtection: {
                title: "Protezione in Tempo Reale",
                description: "Funziona 24/7 in background. Blocca le chiamate istantaneamente prima che ti raggiungano, fornendo protezione continua."
            }
        },
        privacy: {
            title: "Privacy Prima di Tutto",
            localProcessing: {
                title: "Elaborazione 100% Locale",
                description: "Tutto il blocco delle chiamate avviene localmente sul tuo dispositivo. Nessun dato viene inviato a server esterni. La tua privacy è garantita."
            },
            notDialer: {
                title: "Non è un'App Dialer",
                description: "CallShield non è un'app dialer e non sostituisce il dialer predefinito del telefono. Funziona insieme alla tua app telefonica esistente."
            },
            noContactAccess: {
                title: "Contatti protetti",
                description: "CallShield non condivide né acquisisce informazioni inerenti ai tuoi contatti. Elabora solo le notifiche delle chiamate localmente per determinare le azioni di blocco."
            },
            notificationBased: {
                title: "Basato su Notifiche",
                description: "L'app funziona intercettando le notifiche delle chiamate. Non controlla il dialer o le funzioni di chiamata del telefono, filtra solo le chiamate in arrivo."
            }
        },
        appScreens: {
            startTutorial: "Inizia Tutorial",
            darkMode: "Modalità Scura",
            sectionTitle: "Vedi CallShield in Azione",
            sectionSubtitle: "Esplora l'interfaccia dell'app e impara come usare ogni funzionalità",
            navHome: "Home",
            navWhitelist: "Whitelist",
            navBlacklist: "Blacklist",
            navStatistics: "Statistiche",
            blacklistSubNav: {
                countries: "Paesi",
                numbers: "Numeri",
                settings: "Impostazioni"
            },
            home: {
                protectionTitle: "Protezione Attiva",
                protectionTitleInactive: "Protezione Inattiva",
                protectionDescription: "Le chiamate spam vengono bloccate automaticamente.",
                protectionDescriptionInactive: "Il blocco delle chiamate è attualmente disabilitato. Abilita la protezione per bloccare le chiamate indesiderate.",
                statusEnabled: "ATTIVO",
                statusDisabled: "DISATTIVO",
                statsBlockedToday: "Bloccate Oggi",
                statsTotalBlocked: "Totale Bloccate",
                quickActions: "Azioni Rapide",
                whitelistAction: "Whitelist",
                whitelistSubtitle: "Numeri sicuri",
                countriesAction: "Paesi",
                countriesSubtitle: "Blocco geografico",
                numbersAction: "Numeri",
                numbersSubtitle: "Blacklist",
                settingsAction: "Impostazioni",
                settingsSubtitle: "Regole e Pref.",
                recentActivity: "Attività Recente",
                seeAll: "Vedi Tutto",
                blocked: "Bloccato"
            },
            whitelist: {
                searchPlaceholder: "Cerca nella whitelist…",
                allowAllContacts: "Consenti tutti i contatti",
                allowAllContactsDesc: "Aggiungi automaticamente tutti i contatti della rubrica alla whitelist.",
                whitelistedNumbers: "NUMERI IN WHITELIST",
                active: "Attivi"
            },
            statistics: {
                today: "Oggi",
                total: "Totale",
                activity: "Attività",
                daily: "Giornaliero",
                weekly: "Settimanale",
                monthly: "Mensile",
                totalLabel: "Totale:",
                topOrigins: "Origini Principali",
                recentBlocks: "Blocchi Recenti",
                clearAll: "Cancella Tutto"
            },
            blacklist: {
                countries: {
                    title: "Paesi",
                    step: "Passo 1 di 3",
                    subtitle: "Gestisci il blocco delle chiamate per regione.",
                    searchPlaceholder: "Cerca paesi o codici…",
                    filterAll: "Tutti",
                    filterBlocked: "Bloccati",
                    filterAllowed: "Consentiti",
                    blockAll: "Blocca Tutto",
                    allowAll: "Consenti Tutto",
                    hint: "Clicca sulle icone per bloccare o sbloccare i paesi"
                },
                numbers: {
                    title: "Numeri",
                    step: "Passo 2 di 3",
                    subtitle: "Gestisci i numeri di telefono bloccati.",
                    searchPlaceholder: "Cerca numeri…",
                    footerInfo: "Le chiamate da questi numeri verranno automaticamente rifiutate e registrate nelle tue Statistiche.",
                    addNumber: "Aggiungi alla blacklist"
                },
                settings: {
                    title: "Impostazioni",
                    step: "Passo 3 di 3",
                    unknownNumbers: {
                        title: "Numeri Sconosciuti",
                        description: "Blocca automaticamente le chiamate in arrivo da numeri non salvati nella tua lista contatti. Usa con cautela."
                    },
                    unknownCountries: {
                        title: "Paesi Sconosciuti",
                        description: "Blocca le chiamate da numeri che non hanno un prefisso internazionale valido. Questo aiuta a prevenire chiamate contraffatte."
                    },
                    footerInfo: "Le chiamate bloccate appariranno nella tua cronologia ma il telefono non squillerà."
                }
            }
        },
        tutorial: {
            welcome: "Benvenuto in CallShield",
            skip: "Salta",
            previous: "Precedente",
            next: "Successivo",
            finish: "Fine",
            steps: [
                {
                    title: "Stato Protezione",
                    text: "Questa è la scheda di protezione principale. Attiva o disattiva l'interruttore per abilitare o disabilitare il blocco delle chiamate. Quando è abilitato, CallShield bloccherà automaticamente le chiamate indesiderate."
                },
                {
                    title: "Statistiche",
                    text: "Visualizza le tue statistiche di blocco qui. Vedi quante chiamate sono state bloccate oggi e in totale. Le barre di avanzamento mostrano la tua attività di blocco."
                },
                {
                    title: "Azioni Rapide",
                    text: "Accedi rapidamente alle funzionalità chiave da qui. Tocca su qualsiasi scheda per navigare a Whitelist, Paesi, Numeri o Impostazioni."
                },
                {
                    title: "Attività Recente",
                    text: "Vedi le tue chiamate bloccate di recente qui. Questo ti aiuta a tracciare quali numeri sono stati bloccati e quando."
                },
                {
                    title: "Cerca Whitelist",
                    text: "Cerca numeri nella tua whitelist. Digita per filtrare l'elenco e trovare contatti specifici rapidamente."
                },
                {
                    title: "Consenti Tutti i Contatti",
                    text: "Abilita questa opzione per aggiungere automaticamente tutti i contatti della rubrica alla whitelist. Questo assicura che tutti i tuoi contatti salvati possano sempre contattarti."
                },
                {
                    title: "Aggiungi alla Whitelist",
                    text: "Puoi aggiungere manualmente contatti alla tua whitelist. Visualizza qui i numeri nella whitelist e gestiscili individualmente. I numeri nella whitelist potranno sempre chiamarti."
                },
                {
                    title: "Grafico Attività",
                    text: "Visualizza la tua attività di blocco nel tempo. Passa tra le visualizzazioni Giornaliera, Settimanale e Mensile. Usa le frecce di navigazione per sfogliare periodi diversi."
                },
                {
                    title: "Origini Principali",
                    text: "Vedi quali paesi stanno inviando il maggior numero di chiamate bloccate. Questo ti aiuta a identificare modelli e regolare le tue impostazioni di blocco."
                },
                {
                    title: "Navigazione Blacklist",
                    text: "La sezione Blacklist ha tre parti: Paesi, Numeri e Impostazioni. Usa queste schede per navigare tra diverse opzioni di blocco."
                },
                {
                    title: "Filtra Paesi",
                    text: "Filtra i paesi per stato: Tutti, Bloccati o Consentiti. Questo rende più facile gestire grandi elenchi di paesi."
                },
                {
                    title: "Blocca Paesi",
                    text: "Attiva l'interruttore accanto a ogni paese per bloccare o consentire chiamate da quella regione. Verde significa consentito, rosso significa bloccato."
                },
                {
                    title: "Blacklist Numeri",
                    text: "Aggiungi numeri di telefono specifici da bloccare sempre. Questi numeri saranno bloccati indipendentemente da altre impostazioni."
                },
                {
                    title: "Impostazioni Blacklist",
                    text: "Configura regole di blocco avanzate. Blocca numeri sconosciuti o numeri senza prefisso internazionale."
                }
            ]
        },
        widgets: {
            sectionTitle: "Widget Schermata Home",
            sectionSubtitle: "Accesso rapido ai controlli CallShield direttamente dalla schermata home",
            toggle: {
                name: "Widget Toggle (2x2)",
                description: "Widget compatto per attivare o disattivare rapidamente la protezione"
            },
            stats: {
                name: "Widget Statistiche (4x2)",
                description: "Widget completo con toggle e statistiche di blocco"
            },
            statusActive: "ATTIVO",
            statusInactive: "INATTIVO",
            blockedToday: "Bloccati Oggi",
            totalBlocked: "Totale Bloccati",
            tapToToggle: "Tocca per attivare/disattivare"
        },
        cta: {
            title: "Pronto a Bloccare Chiamate Indesiderate?",
            subtitle: "Scarica CallShield ora e prendi il controllo delle tue chiamate in arrivo",
            downloadBtn: "Scarica su Google Play",
            iosComingSoon: "iOS in arrivo"
        },
        footer: {
            tagline: "Blocco chiamate avanzato per Android",
            contact: "Contatto",
            copyright: "© 2025 CallShield. Tutti i diritti riservati."
        },
        dialogs: {
            edit: {
                title: "Modifica",
                titleAdd: "Aggiungi alla Blacklist",
                ariaLabel: "Modifica",
                phoneLabel: "Numero di Telefono",
                phonePlaceholder: "+1 (555) 123-4567",
                nameLabel: "Nome (Opzionale)",
                namePlaceholder: "Nome contatto",
                cancel: "Annulla",
                save: "Salva"
            },
            delete: {
                title: "Eliminare Numero?",
                ariaLabel: "Elimina",
                message: "Sei sicuro di voler eliminare questo numero dalla tua blacklist?",
                delete: "Elimina",
                cancel: "Annulla"
            }
        }
    }
};

