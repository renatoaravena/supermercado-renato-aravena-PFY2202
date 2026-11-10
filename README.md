# Supermercado - Gestión de inventario (PFY2202)

Sitio web de inventario de un supermercado hecho con React, React Router y Tailwind CSS.

## Funcionalidades
- Listado de artículos con filtro por categoría (los datos originales no se modifican).
- Agregar nuevos artículos con validación de formulario.
- Detalle de artículo con botón "Agregar al carrito" (descuenta el stock).
- Carrito: aumentar, disminuir y quitar artículos; el inventario se actualiza en cada cambio.
- Los datos se guardan en `localStorage`.

## Tecnologías
React 18, React Router 6 (rutas anidadas y lazy loading), Context + useReducer, Tailwind CSS, Vite, Vitest.

## Estructura
```
src/
  components/  Layout, ArticuloCard, FiltroCategoria, LineaCarrito, CampoFormulario, Mensaje
  pages/       Inventario, AgregarArticulo, DetalleArticulo, Carrito, NoEncontrado
  routes/      AppRoutes.jsx (rutas centralizadas)
  context/     InventarioContext.jsx
  reducers/    inventarioReducer.js
  utils/       validaciones.js, storage.js
  data/        inventarioInicial.js
  test/        pruebas
```

## Cómo ejecutarlo
```bash
npm install
npm run dev      # desarrollo
npm test         # pruebas
npm run build    # compilar
```

## Publicación en GitHub Pages
1. Cambia `homepage` en `package.json` por `https://TU-USUARIO.github.io/supermercado-nombre-apellido-PFY2202`.
2. Ejecuta `npm run deploy` (crea la rama `gh-pages`).
3. En GitHub: Settings → Pages → rama `gh-pages`.

Se usa `HashRouter` para que las rutas funcionen en GitHub Pages.
