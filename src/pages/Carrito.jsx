import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { formatearPrecio } from '../utils/validaciones';
import LineaCarrito from '../components/LineaCarrito';
import Mensaje from '../components/Mensaje';

export default function Carrito() {
  const { inventario, carrito, aumentar, disminuir, quitar, comprar } = useInventario();
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Se ignoran líneas cuyo artículo ya no exista, para no romper la pantalla
  const lineas = carrito
    .map((l) => ({ articulo: inventario.find((a) => a.id === l.id), cantidad: l.cantidad }))
    .filter((l) => l.articulo);

  const total = lineas.reduce((suma, l) => suma + l.articulo.precio * l.cantidad, 0);

  const finalizar = () => {
    comprar();
    setCompraExitosa(true);
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Carrito de compras</h1>

      {compraExitosa && lineas.length === 0 && <Mensaje tipo="exito">¡Compra realizada con éxito!</Mensaje>}

      {lineas.length === 0 ? (
        <div className="space-y-3">
          {!compraExitosa && <Mensaje>Tu carrito está vacío.</Mensaje>}
          <Link to="/" className="btn-primary">Ir al inventario</Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {lineas.map(({ articulo, cantidad }) => (
              <LineaCarrito
                key={articulo.id}
                articulo={articulo}
                cantidad={cantidad}
                onAumentar={() => aumentar(articulo.id)}
                onDisminuir={() => disminuir(articulo.id)}
                onQuitar={() => quitar(articulo.id)}
              />
            ))}
          </ul>
          <div className="tarjeta flex items-center justify-between">
            <p className="text-lg font-semibold">Total: {formatearPrecio(total)}</p>
            <button type="button" className="btn-primary" onClick={finalizar}>Finalizar compra</button>
          </div>
        </>
      )}
    </section>
  );
}
