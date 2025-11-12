// app.js - Lógica principal de la aplicación

class ChatAssistant {
    constructor() {
        this.conversationHistory = [];
        this.maxHistoryLength = 10;
        this.isProcessing = false;
        this.initializeUI();
        this.attachEventListeners();
    }

    initializeUI() {
        // Elementos del DOM
        this.chatContainer = document.getElementById('chatContainer');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModalBtn = document.querySelector('.close');

        // Desactivar micrófono si no está soportado
        if (!voiceModule.isSpeechRecognitionSupported()) {
            this.voiceBtn.disabled = true;
            this.voiceBtn.title = 'Micrófono no soportado en tu navegador';
        }
    }

    attachEventListeners() {
        // Chat
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Voz
        this.voiceBtn.addEventListener('click', () => this.toggleVoiceInput());

        // Configuración
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeModalBtn.addEventListener('click', () => this.closeSettings());
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.closeSettings();
        });

        // Botones de configuración
        document.getElementById('saveConfigBtn').addEventListener('click', () => this.saveSettings());
        document.getElementById('clearConfigBtn').addEventListener('click', () => this.clearSettings());

        // Cargar configuración en el formulario
        this.loadSettingsForm();
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        
        if (!message) return;

        // Validar configuración
        const validation = configManager.validateConfig();
        if (!validation.isValid) {
            alert('⚠️ Configuración incompleta:\n' + validation.errors.join('\n'));
            this.openSettings();
            return;
        }

        // Agregar mensaje del usuario al chat
        this.addMessageToChat(message, 'user');
        this.userInput.value = '';
        this.isProcessing = true;
        this.showLoading(true);

        try {
            // Reinicializar API con configuración actual
            initializeAPI();

            // Obtener respuesta del asistente
            const response = await geminiAPI.chat(message, this.conversationHistory);
            
            // Agregar respuesta al chat
            this.addMessageToChat(response, 'assistant');

            // Agregar al historial
            this.conversationHistory.push({ role: 'user', content: message });
            this.conversationHistory.push({ role: 'model', content: response });

            // Limitar historial
            if (this.conversationHistory.length > this.maxHistoryLength) {
                this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
            }

            // Reproducir respuesta en voz si está disponible
            if (voiceModule.isTextToSpeechSupported()) {
                voiceModule.speak(response);
            }

        } catch (error) {
            console.error('❌ Error:', error);
            this.addMessageToChat(
                `❌ Error: ${error.message}`,
                'assistant'
            );
        } finally {
            this.isProcessing = false;
            this.showLoading(false);
        }
    }

    toggleVoiceInput() {
        if (!voiceModule.isSpeechRecognitionSupported()) {
            alert('⚠️ Reconocimiento de voz no soportado en tu navegador');
            return;
        }

        if (voiceModule.isListening) {
            voiceModule.stopListening();
        } else {
            voiceModule.startListening();
        }
    }

    addMessageToChat(text, sender) {
        // Crear contenedor del mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        // Crear burbuja
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;

        // Crear hora
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        // Agregar elementos
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(timeDiv);

        // Agregar al chat
        this.chatContainer.appendChild(messageDiv);

        // Scroll automático
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    showLoading(show) {
        if (show) {
            this.loadingIndicator.classList.remove('hidden');
        } else {
            this.loadingIndicator.classList.add('hidden');
        }
    }

    openSettings() {
        this.settingsModal.classList.add('show');
        this.loadSettingsForm();
    }

    closeSettings() {
        this.settingsModal.classList.remove('show');
    }

    loadSettingsForm() {
        document.getElementById('geminiKeyInput').value = 
            configManager.getConfig('GEMINI_API_KEY') || '';
        document.getElementById('googleKeyInput').value = 
            configManager.getConfig('GOOGLE_API_KEY') || '';
        document.getElementById('googleCSEInput').value = 
            configManager.getConfig('GOOGLE_CSE_ID') || '';
        document.getElementById('aiModelInput').value = 
            configManager.getConfig('ai_model') || 'gemini-2.5-flash';
        document.getElementById('assistantNameInput').value = 
            configManager.getConfig('assistant_name') || 'Asistente IA';
    }

    saveSettings() {
        const newConfig = {
            GEMINI_API_KEY: document.getElementById('geminiKeyInput').value,
            GOOGLE_API_KEY: document.getElementById('googleKeyInput').value,
            GOOGLE_CSE_ID: document.getElementById('googleCSEInput').value,
            ai_model: document.getElementById('aiModelInput').value,
            assistant_name: document.getElementById('assistantNameInput').value
        };

        // Validar que al menos la clave Gemini esté presente
        if (!newConfig.GEMINI_API_KEY) {
            alert('⚠️ La clave API Gemini es requerida');
            return;
        }

        configManager.saveConfig(newConfig);
        alert('✅ Configuración guardada exitosamente');
        
        // Reinicializar API
        initializeAPI();
        
        // Actualizar nombre del asistente
        document.querySelector('.header h1').textContent = 
            `🤖 ${newConfig.assistant_name}`;

        this.closeSettings();
    }

    clearSettings() {
        if (confirm('⚠️ ¿Estás seguro de que quieres limpiar toda la configuración?')) {
            configManager.clearConfig();
            this.conversationHistory = [];
            this.chatContainer.innerHTML = `
                <div class="welcome-message">
                    <h2>Bienvenido al Asistente IA</h2>
                    <p>Configura tus claves API para comenzar</p>
                </div>
            `;
            alert('🗑️ Configuración y historial limpios');
            this.loadSettingsForm();
        }
    }

    clearChat() {
        this.conversationHistory = [];
        this.chatContainer.innerHTML = `
            <div class="welcome-message">
                <h2>Bienvenido al Asistente IA</h2>
                <p>Comienza escribiendo tu pregunta</p>
            </div>
        `;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
let assistant;

document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Iniciando Asistente IA Web...');
    
    // Crear instancia del asistente
    assistant = new ChatAssistant();

    // Verificar si la configuración está completa
    if (!configManager.isConfigured()) {
        console.log('⚠️ Configuración incompleta. Abriendo modal de configuración.');
        assistant.openSettings();
    } else {
        console.log('✅ Configuración cargada exitosamente');
    }

    // Actualizar nombre del asistente
    document.querySelector('.header h1').textContent = 
        `🤖 ${configManager.getConfig('assistant_name')}`;

    console.log('✅ Asistente IA Web listo');
});

// Manejo de errores global
window.addEventListener('error', (event) => {
    console.error('❌ Error global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rechazada:', event.reason);
});
