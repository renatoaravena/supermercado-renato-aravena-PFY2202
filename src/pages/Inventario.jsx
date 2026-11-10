import { useMemo, useState } from 'react';
import { useInventario } from '../context/InventarioContext';
import { agruparPorCategoria, listarCategorias } from '../utils/inventario';
import FiltroCategoria from '../components/FiltroCategoria';
import SeccionCategoria from '../components/SeccionCategoria';
import Mensaje from '../components/Mensaje';

export default function Inventario() {
  const { inventario } = useInventario();
  const [categoria, setCategoria] = useState('');

  // El filtro solo cambia lo que se muestra: el inventario original no se modifica
  const grupos = useMemo(() => agruparPorCategoria(inventario, categoria), [inventario, categoria]);
  const categorias = useMemo(() => listarCategorias(inventario), [inventario]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
        <FiltroCategoria categorias={categorias} valor={categoria} onChange={setCategoria} />
      </div>

      {grupos.length === 0 ? (
        <Mensaje>No hay artículos en esta categoría.</Mensaje>
      ) : (
        grupos.map((g) => <SeccionCategoria key={g.categoria} categoria={g.categoria} articulos={g.articulos} />)
      )}
    </div>
  );
}
