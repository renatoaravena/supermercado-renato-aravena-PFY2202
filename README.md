# Supermercado Renato Aravena

Aplicación web de una sola página (SPA) para un supermercado, desarrollada con **React** y **Vite** para la asignatura **Desarrollo Frontend II (PFY2202)**. Usa **React Router** para navegar entre secciones sin recargar la página.

## Funcionalidades

La aplicación tiene un encabezado fijo, un área de contenido que cambia según la ruta y un menú de navegación inferior con tres secciones:

| Ruta                | Sección          | Descripción                                                                 |
| ------------------- | ---------------- | --------------------------------------------------------------------------- |
| `/`                 | Inicio           | Tabla de inventario con producto, categoría, stock y precio.                |
| `/nuestras-tiendas` | Nuestras tiendas | Listado de sucursales (Centro, Providencia y Maipú) con dirección y horario. |
| `/contactanos`      | Contáctanos      | Teléfono y correo de contacto, más un formulario (nombre, correo, mensaje).  |

> Los datos de productos y sucursales están definidos de forma estática en `src/App.jsx`. El formulario de contacto es solo visual: todavía no envía datos a ningún servidor.

## Tecnologías

- [React 19](https://react.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [Vite 8](https://vite.dev/)
- [Oxlint](https://oxc.rs/) para el análisis estático del código

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior
- npm (incluido con Node.js)

## Instalación y uso

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd supermercado-renato-aravena-PFY2202

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Luego abre en el navegador la URL que muestra la terminal (por defecto `http://localhost:5173`).

### Scripts disponibles

| Comando           | Descripción                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con recarga en caliente. |
| `npm run build`   | Genera la versión de producción en la carpeta `dist/`. |
| `npm run preview` | Sirve localmente la versión de producción generada.  |
| `npm run lint`    | Revisa el código con Oxlint.                         |

## Estructura del proyecto

```
supermercado-renato-aravena-PFY2202/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx      # Rutas, datos y componentes (Inventario, NuestrasTiendas, Contactanos)
│   ├── App.css      # Estilos de la aplicación
│   ├── index.css    # Estilos globales
│   └── main.jsx     # Punto de entrada de React
├── index.html
├── vite.config.js
├── .oxlintrc.json
└── package.json
```

## Autor

**Renato Aravena** — Desarrollo Frontend II (PFY2202)
