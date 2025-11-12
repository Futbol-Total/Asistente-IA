// config.js - Gestión de configuración local

class ConfigManager {
    constructor() {
        this.config = {
            assistant_name: 'Asistente IA',
            theme: 'dark',
            GEMINI_API_KEY: '',
            ai_model: 'gemini-2.5-flash',
            GOOGLE_API_KEY: '',
            GOOGLE_CSE_ID: ''
        };
        this.loadConfig();
    }

    loadConfig() {
        // Intentar cargar desde localStorage
        const saved = localStorage.getItem('assistantConfig');
        if (saved) {
            try {
                this.config = { ...this.config, ...JSON.parse(saved) };
                console.log('✅ Configuración cargada desde localStorage');
            } catch (e) {
                console.warn('⚠️ Error al parsear configuración guardada:', e);
            }
        }

        // Cargar desde environment variables si está disponible (para desarrollo)
        if (window.CONFIG) {
            this.config = { ...this.config, ...window.CONFIG };
        }
    }

    saveConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        localStorage.setItem('assistantConfig', JSON.stringify(this.config));
        console.log('✅ Configuración guardada en localStorage');
    }

    clearConfig() {
        this.config = {
            assistant_name: 'Asistente IA',
            theme: 'dark',
            GEMINI_API_KEY: '',
            ai_model: 'gemini-2.5-flash',
            GOOGLE_API_KEY: '',
            GOOGLE_CSE_ID: ''
        };
        localStorage.removeItem('assistantConfig');
        console.log('🗑️ Configuración limpiada');
    }

    getConfig(key) {
        return this.config[key];
    }

    isConfigured() {
        return this.config.GEMINI_API_KEY && 
               this.config.GOOGLE_API_KEY && 
               this.config.GOOGLE_CSE_ID;
    }

    validateConfig() {
        const errors = [];
        
        if (!this.config.GEMINI_API_KEY) {
            errors.push('Clave API Gemini requerida');
        }
        if (!this.config.GOOGLE_API_KEY) {
            errors.push('Clave API Google requerida');
        }
        if (!this.config.GOOGLE_CSE_ID) {
            errors.push('Google CSE ID requerido');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Instancia global
const configManager = new ConfigManager();
