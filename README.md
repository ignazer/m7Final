# PortTrack - Informe Técnico

Este proyecto contiene el informe técnico sobre **Despliegue y Monitoreo Continuo para una Plataforma de Navegación Portuaria**, implementado como una página web estática con pipeline automatizado.

## 🚀 Características

- **Página web responsive** con diseño profesional
- **Pipeline CI/CD automatizado** con GitHub Actions
- **Generación automática de PDF** del informe
- **Despliegue automático** en GitHub Pages
- **Artefactos descargables** (sitio web y PDF)

## 📁 Estructura del Proyecto

```
M7Final/
├── .github/workflows/
│   └── deploy.yml          # Pipeline de GitHub Actions
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # Funcionalidades JavaScript
├── Informe.md              # Contenido del informe en Markdown
├── package.json            # Dependencias del proyecto
├── pipeline-demo.yaml      # Pipeline demostrativo original
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5/CSS3/JavaScript** - Frontend
- **GitHub Actions** - CI/CD
- **Pandoc** - Conversión de Markdown y generación de PDF
- **GitHub Pages** - Hosting

## 📋 Lo que necesitas hacer manualmente

### 1. Crear repositorio en GitHub
```bash
# Crear un nuevo repositorio en GitHub
# Nombre sugerido: porttrack-informe
```

### 2. Subir los archivos
```bash
# En tu terminal, dentro de la carpeta M7Final:
git init
git add .
git commit -m "Initial commit: PortTrack informe pipeline"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/porttrack-informe.git
git push -u origin main
```

### 3. Habilitar GitHub Pages
1. Ve a **Settings** de tu repositorio
2. Scroll hasta **Pages**
3. En **Source** selecciona **GitHub Actions**
4. ¡Listo! El pipeline se ejecutará automáticamente

### 4. Ver el resultado
- **Sitio web**: `https://TU-USUARIO.github.io/porttrack-informe/`
- **Pipeline**: Pestaña **Actions** en GitHub
- **Artefactos**: Disponibles para descarga en cada ejecución

## 🔄 Pipeline Automático

El pipeline se ejecuta automáticamente cuando:
- Haces `push` a la rama `main`
- Creas un `pull request`
- Lo ejecutas manualmente desde GitHub Actions

### Etapas del Pipeline:
1. **🚢 Checkout** - Descarga el código
2. **🧪 Tests** - Ejecuta pruebas básicas
3. **🔍 Security** - Escanea vulnerabilidades
4. **📄 PDF** - Genera PDF del informe con Pandoc
5. **🏗️ Build** - Construye el sitio estático
6. **📊 Artifacts** - Crea artefactos descargables
7. **🚀 Deploy** - Despliega en GitHub Pages

## 📊 Artefactos Generados

Cada ejecución del pipeline genera:
- **porttrack-informe-site**: Sitio web completo
- **porttrack-informe-pdf**: Informe en formato PDF

## 🌐 Demo Local

Para probar localmente, simplemente abre el archivo `index.html` en tu navegador:

## ✨ Funcionalidades

- **Navegación suave** entre secciones
- **Descarga de PDF** desde la web
- **Estado del pipeline** en tiempo real
- **Diseño responsive** para móviles
- **Tema portuario** profesional

¡El pipeline está listo para demostrar CI/CD, monitoreo y automatización en acción! 🚢
