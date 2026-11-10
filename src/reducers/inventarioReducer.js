export const ACCIONES = {
  AGREGAR_ARTICULO: 'AGREGAR_ARTICULO',
  AGREGAR_AL_CARRITO: 'AGREGAR_AL_CARRITO',
  AUMENTAR: 'AUMENTAR',
  DISMINUIR: 'DISMINUIR',
  QUITAR: 'QUITAR',
  COMPRAR: 'COMPRAR',
};

// Devuelve un mensaje de error o null si se puede agregar una unidad al carrito
export function validarAgregar(state, id) {
  const articulo = state.inventario.find((a) => a.id === id);
  if (!articulo) return 'El artículo no existe.';
  if (articulo.stock <= 0) return 'No hay stock disponible.';
  return null;
}

const cambiarStock = (inventario, id, delta) =>
  inventario.map((a) => (a.id === id ? { ...a, stock: a.stock + delta } : a));

export function inventarioReducer(state, action) {
  switch (action.type) {
    case ACCIONES.AGREGAR_ARTICULO: {
      const id = state.inventario.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      return { ...state, inventario: [...state.inventario, { ...action.articulo, id }] };
    }

    case ACCIONES.AGREGAR_AL_CARRITO:
    case ACCIONES.AUMENTAR: {
      if (validarAgregar(state, action.id)) return state;
      const existe = state.carrito.some((l) => l.id === action.id);
      const carrito = existe
        ? state.carrito.map((l) => (l.id === action.id ? { ...l, cantidad: l.cantidad + 1 } : l))
        : [...state.carrito, { id: action.id, cantidad: 1 }];
      return { inventario: cambiarStock(state.inventario, action.id, -1), carrito };
    }

    case ACCIONES.DISMINUIR: {
      const linea = state.carrito.find((l) => l.id === action.id);
      if (!linea) return state;
      const carrito =
        linea.cantidad === 1
          ? state.carrito.filter((l) => l.id !== action.id)
          : state.carrito.map((l) => (l.id === action.id ? { ...l, cantidad: l.cantidad - 1 } : l));
      return { inventario: cambiarStock(state.inventario, action.id, 1), carrito };
    }

    case ACCIONES.QUITAR: {
      const linea = state.carrito.find((l) => l.id === action.id);
      if (!linea) return state;
      return {
        inventario: cambiarStock(state.inventario, action.id, linea.cantidad),
        carrito: state.carrito.filter((l) => l.id !== action.id),
      };
    }

    case ACCIONES.COMPRAR:
      return { ...state, carrito: [] };

    default:
      return state;
  }
}
