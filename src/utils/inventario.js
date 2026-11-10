import { CATEGORIAS } from '../data/inventarioInicial';

// Agrupa los artículos por categoría respetando el orden de CATEGORIAS.
// Si se indica una categoría, devuelve solo ese grupo (si tiene artículos).
export function agruparPorCategoria(inventario, categoriaFiltro = '') {
  const nombres = [...new Set([...CATEGORIAS, ...inventario.map((a) => a.categoria)])];
  return nombres
    .filter((nombre) => !categoriaFiltro || nombre === categoriaFiltro)
    .map((nombre) => ({ categoria: nombre, articulos: inventario.filter((a) => a.categoria === nombre) }))
    .filter((grupo) => grupo.articulos.length > 0);
}

export function listarCategorias(inventario) {
  return [...new Set([...CATEGORIAS, ...inventario.map((a) => a.categoria)])];
}
