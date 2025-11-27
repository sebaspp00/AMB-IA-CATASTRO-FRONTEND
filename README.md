# AMB-IA Chat Widget

Widget de chat React reutilizable para integración en aplicaciones web. Componente autocontenido que se integra fácilmente proporcionando solo una API key.

## 📦 Instalación

```bash
npm install amb-ia-chat-widget
```

o con yarn:

```bash
yarn add amb-ia-chat-widget
```

## 🚀 Uso Rápido

### En una aplicación React

```jsx
import React from 'react';
import ChatWidget from 'amb-ia-chat-widget';
import 'amb-ia-chat-widget/css';

function App() {
  return (
    <div>
      <h1>Mi Aplicación</h1>
      <ChatWidget apiKey="tu-api-key-aqui" />
    </div>
  );
}

export default App;
```

### En HTML vanilla (UMD)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi Aplicación</title>
  <!-- Cargar React desde CDN -->
  <script crossorigin src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
  <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  
  <!-- Cargar estilos del widget -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/amb-ia-chat-widget@latest/dist/amb-ia-chat-widget.css">
</head>
<body>
  <div id="app">
    <h1>Mi Aplicación</h1>
  </div>
  
  <!-- Contenedor para el widget -->
  <div id="chat-widget-root"></div>
  
  <!-- Cargar el widget -->
  <script src="https://cdn.jsdelivr.net/npm/amb-ia-chat-widget@latest/dist/chat-widget.umd.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', function() {
      const ChatWidget = window.ChatWidget.default || window.ChatWidget;
      const container = document.getElementById('chat-widget-root');
      const root = ReactDOM.createRoot(container);
      
      root.render(
        React.createElement(ChatWidget, { 
          apiKey: 'tu-api-key-aqui' 
        })
      );
    });
  </script>
</body>
</html>
```

## 📖 API

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `apiKey` | `string` | ✅ Sí | API key para autenticación con el backend AMB-IA |

### Ejemplo completo

```jsx
import ChatWidget from 'amb-ia-chat-widget';
import 'amb-ia-chat-widget/css';

function MyApp() {
  return (
    <div>
      <ChatWidget apiKey="one-sys-prod-tu-api-key-aqui" />
    </div>
  );
}
```

## 🎨 Estilos

El widget incluye sus propios estilos basados en Tailwind CSS. Debes importar el CSS para que se vea correctamente:

### Con módulos ES6

```jsx
import 'amb-ia-chat-widget/css';
// o
import 'amb-ia-chat-widget/styles';
```

### Con UMD

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/amb-ia-chat-widget@latest/dist/amb-ia-chat-widget.css">
```

## 🔧 Requisitos

- **React**: ^18.0.0 o ^19.0.0
- **React DOM**: ^18.0.0 o ^19.0.0

Estas son dependencias peer, por lo que debes tenerlas instaladas en tu proyecto.

## 📝 Características

- ✅ Fácil integración con solo una API key
- ✅ Componente autocontenido
- ✅ Soporte para React 18 y 19
- ✅ Formato ESM y UMD
- ✅ Estilos incluidos
- ✅ Chat en tiempo real
- ✅ Interfaz responsive
- ✅ Markdown en respuestas
- ✅ Scroll automático

## 🛠️ Desarrollo

Si quieres contribuir o modificar el widget:

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build del widget
npm run build:widget

# Preview
npm run preview
```

## 📄 Licencia

MIT

## 🤝 Soporte

Para reportar bugs o solicitar características, abre un issue en el repositorio.

## 📚 Ejemplos

Ver la carpeta `examples/` para ejemplos de integración completos.
