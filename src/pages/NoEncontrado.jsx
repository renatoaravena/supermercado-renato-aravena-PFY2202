import { Link } from 'react-router-dom';

export default function NoEncontrado() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Página no encontrada</h1>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </div>
  );
}
