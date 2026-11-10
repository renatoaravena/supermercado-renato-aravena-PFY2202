import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/validaciones';

export default function ArticuloCard({ articulo }) {
  const agotado = articulo.stock <= 0;

  return (
    <Link to={`/articulo/${articulo.id}`} className="tarjeta block transition hover:border-brand-primary">
      <h3 className="font-semibold text-gray-900">{articulo.nombre}</h3>
      <p className="mt-2 text-brand-primary">{formatearPrecio(articulo.precio)}</p>
      <p className={`mt-1 text-sm ${agotado ? 'font-medium text-red-600' : 'text-gray-600'}`}>
        {agotado ? 'Agotado' : `Stock: ${articulo.stock}`}
      </p>
    </Link>
  );
}
