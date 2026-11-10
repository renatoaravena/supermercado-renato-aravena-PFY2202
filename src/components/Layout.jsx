import { NavLink, Outlet } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';

const claseLink = ({ isActive }) =>
  `rounded px-3 py-2 text-sm font-medium ${isActive ? 'bg-white text-brand-primary' : 'text-white hover:bg-brand-secondary'}`;

export default function Layout() {
  const { carrito } = useInventario();
  const totalUnidades = carrito.reduce((suma, l) => suma + l.cantidad, 0);

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="bg-brand-primary">
        <nav className="flex w-full flex-wrap items-center gap-2 px-4 py-3 sm:px-8">
          <span className="mr-auto text-lg font-bold text-white">Supermercado</span>
          <NavLink to="/" end className={claseLink}>Inventario</NavLink>
          <NavLink to="/agregar" className={claseLink}>Agregar artículo</NavLink>
          <NavLink to="/carrito" className={claseLink}>
            Carrito ({totalUnidades})
          </NavLink>
        </nav>
      </header>
      <main className="w-full px-4 py-6 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
