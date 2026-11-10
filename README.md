# Supermercado - Gestión de inventario

**Asignatura:** Desarrollo Frontend II (PFY2202)
**Actividad:** Semana 3 - Desarrollando sitios web con React avanzado (evaluación sumativa, forma B)
**Autor:** Nombre Apellido
**Sitio publicado:** https://TU-USUARIO.github.io/supermercado-nombre-apellido-PFY2202

## Descripción

Sitio web de gestión de inventario de un supermercado. Continúa la actividad formativa 2 (agregar y listar artículos) y suma filtro por categoría, detalle de artículo y carrito de compras, que descuenta y devuelve stock en tiempo real.

## Funcionalidades

| Pantalla | Ruta | Descripción |
|---|---|---|
| Inventario | `/` | Artículos agrupados por categoría (Lácteos, Carnes, etc.) con filtro por categoría. El filtro no modifica los datos originales. |
| Agregar artículo | `/agregar` | Formulario con validaciones (nombre, categoría, precio y stock). Rechaza nombres duplicados. |
| Detalle | `/articulo/:articuloId` | Muestra la información del artículo y permite agregarlo al carrito, descontando stock. |
| Carrito | `/carrito` | Lista los artículos agregados. Permite aumentar, disminuir y quitar unidades, y finalizar la compra. El inventario se actualiza en cada cambio. |

Reglas de stock:
- Agregar o aumentar una unidad en el carrito descuenta 1 del inventario.
- Disminuir o quitar devuelve el stock al inventario.
- No se puede superar el stock disponible ni agregar artículos agotados.
- Finalizar compra vacía el carrito sin devolver stock.

Los datos se guardan en `localStorage`, por lo que se mantienen al recargar la página.

## Tecnologías

- React 18 y React Router 6 (rutas centralizadas, anidadas, con parámetros dinámicos y lazy loading)
- Context API y `useReducer` para el estado global
- Tailwind CSS (tema propio y clases reutilizables con `@apply`)
- Vite, Vitest y Testing Library

## Estructura del proyecto

```
src/
  components/  Layout, ArticuloCard, SeccionCategoria, FiltroCategoria,
               LineaCarrito, CampoFormulario, Mensaje
  pages/       Inventario, AgregarArticulo, DetalleArticulo, Carrito, NoEncontrado
  routes/      AppRoutes.jsx
  context/     InventarioContext.jsx
  reducers/    inventarioReducer.js
  utils/       inventario.js, validaciones.js, storage.js
  data/        inventarioInicial.js
  test/        pruebas unitarias y de componentes
```

## Cómo ejecutarlo

Requiere Node.js instalado.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm test         # ejecutar pruebas
npm run build    # generar versión de producción
```
