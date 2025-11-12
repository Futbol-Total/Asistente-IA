# GitHub Pages Configuration for Asistente IA Web

Este archivo configura el sitio para GitHub Pages.

## 🌐 Acceder a la Versión Web

Una vez que hayas habilitado GitHub Pages en tu repositorio:

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona la rama `main` y la carpeta `web`
3. Tu sitio estará disponible en: `https://Futbol-Total.github.io/Asistente-IA/`

## 📋 Configuración en GitHub

### Habilitar GitHub Pages

1. Ve a tu repositorio
2. Click en **Settings**
3. En el menú izquierdo, selecciona **Pages**
4. En **Source**:
   - Rama: `main`
   - Carpeta: `/web`
5. Click en **Save**

El sitio se desplegará automáticamente en unos minutos.

## 🔗 URL del Sitio

Una vez configurado, accede a:
- `https://Futbol-Total.github.io/Asistente-IA/`

## ⚠️ Importante: Seguridad

**Nunca, NUNCA subas tus claves API reales a GitHub.**

Las claves API se deben:
1. ✅ Guardar localmente en `localStorage` del navegador
2. ✅ Ingresar manualmente cuando uses la aplicación
3. ❌ NO subir a Git (están en .gitignore)

## 🚀 Cambios en el Futuro

Si haces cambios en la carpeta `/web/`:
1. Haz commit y push a GitHub
2. GitHub Pages se actualizará automáticamente
3. Los cambios estarán disponibles en 1-2 minutos

## 📝 Archivo .nojekyll

Si GitHub Pages no renderiza correctamente los archivos, crea un archivo `.nojekyll` vacío en la raíz de la rama de despliegue.

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll for proper GitHub Pages deployment"
git push
```

## 🐛 Solución de Problemas

### El sitio no se ve correctamente
- Verifica que GitHub Pages esté habilitado
- Asegúrate de que apunta a la carpeta `/web`
- Limpia el caché del navegador (Ctrl+Shift+Delete)

### Los estilos CSS no cargan
- Verifica los paths relativos en index.html
- Todos los archivos deben estar en la carpeta `/web`

### La API no funciona
- Verifica que hayas ingresado las claves API correctamente
- Comprueba que las APIs estén habilitadas en Google Cloud
- Abre la consola del navegador (F12) para ver errores

## 📚 Referencias

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Deploying with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages)
