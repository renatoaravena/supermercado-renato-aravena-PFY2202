import { inventarioReducer, ACCIONES, validarAgregar } from '../reducers/inventarioReducer';

const base = () => ({
  inventario: [
    { id: 1, nombre: 'Leche', categoria: 'Lácteos', precio: 1000, stock: 2 },
    { id: 2, nombre: 'Pan', categoria: 'Panadería', precio: 500, stock: 0 },
  ],
  carrito: [],
});

describe('inventarioReducer', () => {
  it('agrega un artículo con id nuevo', () => {
    const s = inventarioReducer(base(), {
      type: ACCIONES.AGREGAR_ARTICULO,
      articulo: { nombre: 'Té', categoria: 'Despensa', precio: 900, stock: 5 },
    });
    expect(s.inventario).toHaveLength(3);
    expect(s.inventario[2].id).toBe(3);
  });

  it('agregar al carrito descuenta stock', () => {
    const s = inventarioReducer(base(), { type: ACCIONES.AGREGAR_AL_CARRITO, id: 1 });
    expect(s.inventario[0].stock).toBe(1);
    expect(s.carrito).toEqual([{ id: 1, cantidad: 1 }]);
  });

  it('no agrega si no hay stock ni si el artículo no existe', () => {
    const s = base();
    expect(inventarioReducer(s, { type: ACCIONES.AGREGAR_AL_CARRITO, id: 2 })).toBe(s);
    expect(inventarioReducer(s, { type: ACCIONES.AGREGAR_AL_CARRITO, id: 99 })).toBe(s);
    expect(validarAgregar(s, 2)).toMatch(/stock/);
    expect(validarAgregar(s, 99)).toMatch(/no existe/);
  });

  it('no permite superar el stock al aumentar', () => {
    let s = base();
    s = inventarioReducer(s, { type: ACCIONES.AUMENTAR, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.AUMENTAR, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.AUMENTAR, id: 1 });
    expect(s.inventario[0].stock).toBe(0);
    expect(s.carrito[0].cantidad).toBe(2);
  });

  it('disminuir devuelve stock y elimina la línea al llegar a 0', () => {
    let s = inventarioReducer(base(), { type: ACCIONES.AGREGAR_AL_CARRITO, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.DISMINUIR, id: 1 });
    expect(s.inventario[0].stock).toBe(2);
    expect(s.carrito).toEqual([]);
  });

  it('quitar devuelve todo el stock de la línea', () => {
    let s = inventarioReducer(base(), { type: ACCIONES.AGREGAR_AL_CARRITO, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.AUMENTAR, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.QUITAR, id: 1 });
    expect(s.inventario[0].stock).toBe(2);
    expect(s.carrito).toEqual([]);
  });

  it('comprar vacía el carrito sin devolver stock', () => {
    let s = inventarioReducer(base(), { type: ACCIONES.AGREGAR_AL_CARRITO, id: 1 });
    s = inventarioReducer(s, { type: ACCIONES.COMPRAR });
    expect(s.carrito).toEqual([]);
    expect(s.inventario[0].stock).toBe(1);
  });

  it('ignora acciones sobre líneas inexistentes o desconocidas', () => {
    const s = base();
    expect(inventarioReducer(s, { type: ACCIONES.DISMINUIR, id: 1 })).toBe(s);
    expect(inventarioReducer(s, { type: ACCIONES.QUITAR, id: 1 })).toBe(s);
    expect(inventarioReducer(s, { type: 'OTRA' })).toBe(s);
  });
});
