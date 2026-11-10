import { createContext, useContext, useEffect, useReducer } from 'react';
import { inventarioReducer, ACCIONES } from '../reducers/inventarioReducer';
import { inventarioInicial } from '../data/inventarioInicial';
import { cargarEstado, guardarEstado } from '../utils/storage';

const InventarioContext = createContext(null);

const estadoInicial = () => cargarEstado() ?? { inventario: inventarioInicial, carrito: [] };

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(inventarioReducer, undefined, estadoInicial);

  useEffect(() => {
    guardarEstado(state);
  }, [state]);

  const value = {
    inventario: state.inventario,
    carrito: state.carrito,
    agregarArticulo: (articulo) => dispatch({ type: ACCIONES.AGREGAR_ARTICULO, articulo }),
    agregarAlCarrito: (id) => dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, id }),
    aumentar: (id) => dispatch({ type: ACCIONES.AUMENTAR, id }),
    disminuir: (id) => dispatch({ type: ACCIONES.DISMINUIR, id }),
    quitar: (id) => dispatch({ type: ACCIONES.QUITAR, id }),
    comprar: () => dispatch({ type: ACCIONES.COMPRAR }),
  };

  return <InventarioContext.Provider value={value}>{children}</InventarioContext.Provider>;
}

export function useInventario() {
  const ctx = useContext(InventarioContext);
  if (!ctx) throw new Error('useInventario debe usarse dentro de InventarioProvider');
  return ctx;
}
