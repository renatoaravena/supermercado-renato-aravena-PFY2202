import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/validaciones';

export default function LineaCarrito({ articulo, cantidad, onAumentar, onDisminuir, onQuitar }) {
  return (
    <li className="tarjeta flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1">
        <Link to={`/articulo/${articulo.id}`} className="font-semibold text-gray-900 hover:underline">
          {articulo.nombre}
        </Link>
        <p className="text-sm text-gray-600">{formatearPrecio(articulo.precio)} c/u</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn-secondary"
          aria-label={`Disminuir ${articulo.nombre}`}
          onClick={onDisminuir}
        >
          −
        </button>
        <span className="w-8 text-center" aria-label={`Cantidad de ${articulo.nombre}`}>{cantidad}</span>
        <button
          type="button"
          className="btn-secondary"
          aria-label={`Aumentar ${articulo.nombre}`}
          disabled={articulo.stock <= 0}
          onClick={onAumentar}
        >
          +
        </button>
      </div>

      <p className="w-24 text-right font-medium">{formatearPrecio(articulo.precio * cantidad)}</p>
      <button type="button" className="btn-danger" onClick={onQuitar}>Quitar</button>
    </li>
  );
}
