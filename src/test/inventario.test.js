import { agruparPorCategoria, listarCategorias } from '../utils/inventario';

const inv = [
  { id: 1, nombre: 'Pan', categoria: 'Panadería' },
  { id: 2, nombre: 'Leche', categoria: 'Lácteos' },
  { id: 3, nombre: 'Yogurt', categoria: 'Lácteos' },
  { id: 4, nombre: 'Cosa', categoria: 'Otra' },
];

describe('agruparPorCategoria', () => {
  it('agrupa en orden y omite categorías vacías', () => {
    const g = agruparPorCategoria(inv);
    expect(g.map((x) => x.categoria)).toEqual(['Lácteos', 'Panadería', 'Otra']);
    expect(g[0].articulos).toHaveLength(2);
  });

  it('filtra por una categoría y no modifica el arreglo original', () => {
    const copia = [...inv];
    expect(agruparPorCategoria(inv, 'Lácteos')).toHaveLength(1);
    expect(agruparPorCategoria(inv, 'Carnes')).toEqual([]);
    expect(inv).toEqual(copia);
  });

  it('lista categorías incluyendo las no predefinidas', () => {
    expect(listarCategorias(inv)).toContain('Otra');
  });

  it('funciona con inventario vacío', () => {
    expect(agruparPorCategoria([])).toEqual([]);
  });
});
