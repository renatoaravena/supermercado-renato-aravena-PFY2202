import { Link, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { formatearPrecio } from '../utils/validaciones';
import Mensaje from '../components/Mensaje';

export default function DetalleArticulo() {
  const { articuloId } = useParams();
  const { inventario, carrito, agregarAlCarrito } = useInventario();

  const articulo = inventario.find((a) => a.id === Number(articuloId));

  if (!articulo) {
    return (
      <div className="space-y-4">
        <Mensaje tipo="error">El artículo solicitado no existe.</Mensaje>
        <Link to="/" className="btn-secondary">Volver al inventario</Link>
      </div>
    );
  }

  const enCarrito = carrito.find((l) => l.id === articulo.id)?.cantidad ?? 0;
  const agotado = articulo.stock <= 0;

  return (
    <section className="mx-auto max-w-lg space-y-4">
      <Link to="/" className="text-sm text-brand-primary hover:underline">← Volver al inventario</Link>
      <div className="tarjeta space-y-3">
        <p className="text-xs uppercase tracking-wide text-gray-500">{articulo.categoria}</p>
        <h1 className="text-2xl font-bold text-gray-900">{articulo.nombre}</h1>
        <p className="text-xl text-brand-primary">{formatearPrecio(articulo.precio)}</p>
        <p className="text-sm text-gray-700">Stock disponible: {articulo.stock}</p>
        {enCarrito > 0 && <p className="text-sm text-gray-700">En tu carrito: {enCarrito}</p>}

        {agotado && <Mensaje tipo="error">No hay stock disponible.</Mensaje>}

        <div className="flex gap-2">
          <button type="button" className="btn-primary" disabled={agotado} onClick={() => agregarAlCarrito(articulo.id)}>
            Agregar al carrito
          </button>
          <Link to="/carrito" className="btn-secondary">Ver carrito</Link>
        </div>
      </div>
    </section>
  );
}
