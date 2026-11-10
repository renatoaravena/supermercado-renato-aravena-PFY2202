import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';

const Inventario = lazy(() => import('../pages/Inventario'));
const AgregarArticulo = lazy(() => import('../pages/AgregarArticulo'));
const DetalleArticulo = lazy(() => import('../pages/DetalleArticulo'));
const Carrito = lazy(() => import('../pages/Carrito'));
const NoEncontrado = lazy(() => import('../pages/NoEncontrado'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p className="p-4 text-gray-600">Cargando...</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inventario />} />
          <Route path="/agregar" element={<AgregarArticulo />} />
          <Route path="/articulo/:articuloId" element={<DetalleArticulo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
