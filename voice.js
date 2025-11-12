// voice.js - Módulo de reconocimiento y síntesis de voz

class VoiceModule {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'es-ES';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onstart = () => {
                this.isListening = true;
                console.log('🎤 Escuchando...');
                document.getElementById('voiceBtn').classList.add('listening');
            };

            this.recognition.onend = () => {
                this.isListening = false;
                document.getElementById('voiceBtn').classList.remove('listening');
                console.log('🎤 Escucha finalizada');
            };

            this.recognition.onerror = (event) => {
                console.error('❌ Error de reconocimiento:', event.error);
                alert(`Error de micrófono: ${event.error}`);
                this.isListening = false;
            };

            this.recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                
                if (transcript.trim()) {
                    document.getElementById('userInput').value = transcript;
                    console.log('✅ Texto reconocido:', transcript);
                }
            };
        } else {
            console.warn('⚠️ Speech Recognition no soportado en este navegador');
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    speak(text) {
        if (!this.synthesis) {
            console.warn('⚠️ Text-to-Speech no soportado');
            return;
        }

        // Cancelar cualquier síntesis en curso
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            console.log('🔊 Reproduciendo respuesta...');
        };

        utterance.onend = () => {
            console.log('✅ Respuesta reproducida');
        };

        utterance.onerror = (event) => {
            console.error('❌ Error en síntesis de voz:', event.error);
        };

        this.synthesis.speak(utterance);
    }

    isSpeechRecognitionSupported() {
        return !!this.recognition;
    }

    isTextToSpeechSupported() {
        return !!this.synthesis;
    }
}

// Instancia global
const voiceModule = new VoiceModule();

// CSS para estado de escucha
const style = document.createElement('style');
style.textContent = `
    .voice-btn.listening {
        animation: pulse 1s infinite;
        background-color: #ff5252;
    }

    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
        }
    }
`;
document.head.appendChild(style);
