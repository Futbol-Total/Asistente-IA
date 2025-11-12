// api.js - Llamadas a APIs de Gemini y Google Search

class GeminiAPI {
    constructor(apiKey, model = 'gemini-2.5-flash') {
        this.apiKey = apiKey;
        this.model = model;
        this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    async chat(message, conversationHistory = []) {
        try {
            // Validar API Key
            if (!this.apiKey) {
                throw new Error('API Key de Gemini no configurada');
            }

            // Construir el historial de conversación
            const contents = [
                ...conversationHistory.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: message }]
                }
            ];

            const payload = {
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            };

            const response = await fetch(
                `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error en Gemini API: ${error.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates.length > 0) {
                const content = data.candidates[0].content?.parts?.[0]?.text;
                if (content) {
                    return content;
                }
            }

            throw new Error('No se recibió respuesta válida de Gemini');

        } catch (error) {
            console.error('❌ Error en Gemini API:', error);
            throw error;
        }
    }

    async search(query) {
        // Este método usa la Google Search API
        try {
            const googleAPI = new GoogleSearchAPI(
                configManager.getConfig('GOOGLE_API_KEY'),
                configManager.getConfig('GOOGLE_CSE_ID')
            );
            return await googleAPI.search(query);
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            throw error;
        }
    }
}

class GoogleSearchAPI {
    constructor(apiKey, searchEngineId) {
        this.apiKey = apiKey;
        this.searchEngineId = searchEngineId;
        this.baseURL = 'https://www.googleapis.com/customsearch/v1';
    }

    async search(query) {
        try {
            if (!this.apiKey || !this.searchEngineId) {
                throw new Error('Configuración de Google Search incompleta');
            }

            const params = new URLSearchParams({
                q: query,
                key: this.apiKey,
                cx: this.searchEngineId,
                num: 5
            });

            const response = await fetch(`${this.baseURL}?${params}`);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error en Google Search: ${error.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            let results = [];
            if (data.items) {
                results = data.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    snippet: item.snippet
                }));
            }

            return results;
        } catch (error) {
            console.error('❌ Error en Google Search:', error);
            throw error;
        }
    }

    formatSearchResults(results) {
        if (!results || results.length === 0) {
            return 'No se encontraron resultados.';
        }

        return results.map((result, index) => 
            `${index + 1}. **${result.title}**\n${result.snippet}\n🔗 [Leer más](${result.link})`
        ).join('\n\n');
    }
}

// Instancia global de la API
let geminiAPI;

function initializeAPI() {
    const apiKey = configManager.getConfig('GEMINI_API_KEY');
    const model = configManager.getConfig('ai_model');
    geminiAPI = new GeminiAPI(apiKey, model);
}

// Inicializar API cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeAPI);
