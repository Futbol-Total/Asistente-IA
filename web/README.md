# Asistente IA - Versión Web

Una interfaz web moderna para el Asistente IA que funciona directamente en el navegador.

## 🚀 Características

- ✨ Interfaz moderna y responsiva
- 🎤 Reconocimiento de voz (dictado)
- 🔊 Síntesis de voz (respuestas habladas)
- 💾 Almacenamiento local de configuración
- 🔐 Seguridad: Las claves API se guardan solo localmente
- 🌐 Compatible con Gemini API y Google Search API
- 📱 Funciona en cualquier navegador moderno

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Clave API de Google Gemini
- Clave API de Google Custom Search
- Google Custom Search Engine ID

## ⚙️ Configuración

### 1. Obtener las claves API

#### Google Gemini API
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una nueva clave API
3. Copia la clave

#### Google Custom Search
1. Ve a [Google Custom Search](https://cse.google.com/cse/)
2. Crea un nuevo motor de búsqueda
3. Obtén tu Search Engine ID (cx)
4. Habilita la Custom Search API en Google Cloud

### 2. Configurar en la aplicación

1. Abre `index.html` en tu navegador
2. Haz clic en ⚙️ **Configuración**
3. Ingresa tus claves API
4. Marca "Guardar en navegador" para mantenerlas almacenadas localmente
5. Haz clic en **Guardar**

## 📁 Estructura de archivos

```
web/
├── index.html       # Interfaz HTML
├── styles.css       # Estilos CSS
├── config.js        # Gestión de configuración
├── api.js          # Llamadas a APIs (Gemini, Google Search)
├── voice.js        # Módulo de reconocimiento y síntesis de voz
├── app.js          # Lógica principal de la aplicación
└── README.md       # Este archivo
```

## 🎯 Uso

### Enviar un mensaje
1. Escribe tu pregunta en el campo de entrada
2. Presiona **Enter** o haz clic en **📤 Enviar**
3. El asistente responderá automáticamente

### Usar el micrófono
1. Haz clic en el botón **🎤 Micrófono**
2. Habla en español
3. El texto se mostrará automáticamente en el campo de entrada
4. Presiona **Enter** para enviar

### Escuchar la respuesta
- Las respuestas se reproducen automáticamente en voz si tu navegador lo soporta
- El volumen y velocidad son ajustables en el navegador

## 🔐 Privacidad y Seguridad

- ✅ Las claves API se guardan **únicamente en localStorage** del navegador
- ✅ No se envían a ningún servidor externo
- ✅ Los datos se almacenan localmente y se pueden eliminar en cualquier momento
- ✅ Usa HTTPS para comunicarse con las APIs de Google

## 🌐 Compatibilidad

| Característica | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Chat | ✅ | ✅ | ✅ | ✅ |
| Reconocimiento de voz | ✅ | ✅ | ⚠️ | ✅ |
| Síntesis de voz | ✅ | ✅ | ✅ | ✅ |

## 🛠️ Desarrollo

Para modificar la aplicación:

1. Abre los archivos `.js` en tu editor
2. Realiza los cambios
3. Recarga la página en el navegador (Ctrl+R)

### Estructura de módulos

- **config.js**: Gestiona la configuración y almacenamiento local
- **api.js**: Conecta con Gemini y Google Search APIs
- **voice.js**: Maneja reconocimiento y síntesis de voz
- **app.js**: Lógica principal y gestión de interfaz

## 🐛 Solución de problemas

### "Error: API Key de Gemini no configurada"
- Abre ⚙️ Configuración
- Asegúrate de haber ingresado todas las claves API
- Verifica que las claves sean correctas

### El micrófono no funciona
- Verifica que tu navegador soporte Web Speech API
- Comprueba que has dado permisos de micrófono
- Algunos navegadores requieren HTTPS

### No se escucha la respuesta
- Verifica que el volumen del navegador no esté silenciado
- Comprueba que tu navegador soporte Web Speech API
- Algunos navegadores requieren HTTPS

## 📝 Licencia

Este proyecto es código abierto y está disponible en GitHub.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un fork del repositorio
2. Crea una rama con tu característica
3. Envía un pull request

## 📞 Soporte

Para reportar problemas o sugerencias, abre un issue en GitHub.
