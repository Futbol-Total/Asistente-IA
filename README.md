# 🤖 Asistente IA

Un asistente de inteligencia artificial versátil disponible en múltiples plataformas: aplicación de escritorio (Flet) y web moderna.

## 🌟 Características Principales

- 🎯 Inteligencia Artificial basada en Google Gemini
- 🎤 Reconocimiento de voz en español
- 🔊 Síntesis de voz (texto a voz)
- 🌐 Búsqueda web integrada con Google Custom Search
- 📱 Interfaz web responsive
- 🖥️ Aplicación de escritorio con Flet
- 💾 Almacenamiento de configuración
- 🔐 Manejo seguro de claves API

## 📦 Versiones Disponibles

### 🌐 Versión Web
Una interfaz moderna que funciona directamente en el navegador sin necesidad de instalación.

- **Ubicación**: `/web/`
- **Acceso**: Abre `web/index.html` en tu navegador
- **Requisitos**: Navegador moderno
- **Características**: Chat, voz, búsqueda web

Ver [Web README](./web/README.md) para más detalles.

### 🖥️ Versión Escritorio (Flet)
Aplicación de escritorio completa con todas las características.

- **Ubicación**: `/app/`
- **Requisitos**: Python 3.8+
- **Características**: Chat completo, acciones del sistema, carga de documentos

## 🚀 Inicio Rápido

### Versión Web

1. Abre `web/index.html` en tu navegador
2. Haz clic en ⚙️ **Configuración**
3. Ingresa tus claves API
4. ¡Comienza a chatear!

### Versión Escritorio

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Configurar variables de entorno
# Copia .env.example a .env y completa tus claves
cp .env.example .env

# 3. Ejecutar la aplicación
python -m app.main
```

## ⚙️ Configuración

### Obtener Claves API

#### Google Gemini API
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una nueva clave API
3. Copia y guarda la clave

#### Google Custom Search
1. Ve a [Google Custom Search](https://cse.google.com/cse/)
2. Crea un nuevo motor de búsqueda
3. Obtén tu Search Engine ID
4. Habilita Custom Search API en Google Cloud Console

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_clave_aqui
GOOGLE_API_KEY=tu_clave_aqui
GOOGLE_CSE_ID=tu_id_aqui
```

## 📁 Estructura del Proyecto

```
Asistente-IA/
├── app/                      # Aplicación de escritorio (Flet)
│   ├── main.py              # Punto de entrada
│   ├── ia_core.py           # Núcleo de IA
│   ├── config.py            # Gestión de configuración
│   ├── voice_module.py      # Módulo de voz
│   ├── actions.py           # Acciones del sistema
│   ├── document_loader.py   # Carga de documentos
│   ├── web_integrations.py  # Integraciones web
│   ├── utils.py             # Utilidades
│   └── config.json          # Configuración local
│
├── web/                      # Versión web
│   ├── index.html           # Interfaz HTML
│   ├── styles.css           # Estilos CSS
│   ├── app.js               # Lógica principal
│   ├── api.js               # Llamadas a APIs
│   ├── config.js            # Configuración
│   ├── voice.js             # Módulo de voz
│   └── README.md            # Documentación web
│
├── db/                       # Base de datos (Chroma)
├── requirements.txt          # Dependencias Python
├── .env.example             # Plantilla de variables
├── .gitignore               # Archivos ignorados
└── README.md                # Este archivo
```

## 🛠️ Requisitos

### General
- Python 3.8+ (para versión de escritorio)
- Conexión a Internet
- Claves API de Google

### Versión Web
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Versión Escritorio
```
flet>=0.28.0
google-generativeai
langchain
langchain-google-genai
langchain-community
python-dotenv
requests
speechrecognition
pyttsx3
```

## 📚 Documentación Adicional

- [Documentación de Versión Web](./web/README.md)
- [Google Gemini API Docs](https://ai.google.dev/)
- [Google Custom Search API](https://developers.google.com/custom-search)

## 🔐 Privacidad y Seguridad

- ✅ Las claves API se almacenan localmente en tu máquina
- ✅ En la versión web, se guardan solo en localStorage del navegador
- ✅ No se envían datos a servidores no autorizados
- ✅ Usa conexiones HTTPS para comunicarse con APIs

## 🐛 Solución de Problemas

### Error de API Key
- Verifica que la clave sea correcta
- Asegúrate de haber copiado toda la clave
- Verifica que la API esté habilitada en Google Cloud

### Micrófono no funciona
- Verifica los permisos del navegador/sistema
- Algunos navegadores requieren HTTPS
- Comprueba que el micrófono esté conectado

### Respuestas lentas
- Verifica tu conexión a Internet
- Comprueba el estado de las APIs de Google
- Intenta con un prompt más corto

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama con tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es código abierto y está disponible bajo licencia MIT.

## 👤 Autor

Oscar Vega - [GitHub](https://github.com/Futbol-Total)

## 📞 Contacto

Para preguntas o sugerencias:
- 📧 Email: odavidvega@uniguajira.edu.co
- 🐙 GitHub: Abre un issue en el repositorio
