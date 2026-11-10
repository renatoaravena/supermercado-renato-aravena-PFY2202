export function validarArticulo({ nombre, categoria, precio, stock }, inventario = []) {
  const errores = {};
  const nombreLimpio = String(nombre ?? '').trim();

  if (nombreLimpio.length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
  } else if (inventario.some((a) => a.nombre.toLowerCase() === nombreLimpio.toLowerCase())) {
    errores.nombre = 'Ya existe un artículo con ese nombre.';
  }

  if (!categoria) {
    errores.categoria = 'Selecciona una categoría.';
  }

  const precioNum = Number(precio);
  if (precio === '' || !Number.isFinite(precioNum) || precioNum <= 0) {
    errores.precio = 'El precio debe ser un número mayor a 0.';
  }

  const stockNum = Number(stock);
  if (stock === '' || !Number.isInteger(stockNum) || stockNum < 0) {
    errores.stock = 'El stock debe ser un número entero de 0 o más.';
  }

  return errores;
}

export const formatearPrecio = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
