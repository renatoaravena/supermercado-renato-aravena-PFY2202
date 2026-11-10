const CLAVE = 'supermercado-estado';

export function cargarEstado() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (!guardado) return null;
    const datos = JSON.parse(guardado);
    if (!Array.isArray(datos?.inventario) || !Array.isArray(datos?.carrito)) return null;
    return datos;
  } catch {
    return null;
  }
}

export function guardarEstado(estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    // Sin almacenamiento disponible: la app sigue funcionando en memoria
  }
}
