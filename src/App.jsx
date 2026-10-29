import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  // Inventario del supermercado
  const productos = [
    { nombre: 'Leche entera 1 L', categoria: 'Lácteos', stock: 48, precio: '$1.090' },
    { nombre: 'Yogur natural', categoria: 'Lácteos', stock: 30, precio: '$450' },
    { nombre: 'Pan marraqueta 1 kg', categoria: 'Panadería', stock: 6, precio: '$1.990' },
    { nombre: 'Arroz grado 1 1 kg', categoria: 'Abarrotes', stock: 75, precio: '$1.390' },
    { nombre: 'Fideos spaghetti 400 g', categoria: 'Abarrotes', stock: 60, precio: '$890' },
    { nombre: 'Aceite vegetal 1 L', categoria: 'Abarrotes', stock: 22, precio: '$2.490' },
    { nombre: 'Manzana roja 1 kg', categoria: 'Frutas y verduras', stock: 40, precio: '$1.290' },
    { nombre: 'Tomate 1 kg', categoria: 'Frutas y verduras', stock: 8, precio: '$1.590' },
    { nombre: 'Pechuga de pollo 1 kg', categoria: 'Carnes', stock: 15, precio: '$5.990' },
    { nombre: 'Detergente líquido 3 L', categoria: 'Limpieza', stock: 0, precio: '$6.490' },
    { nombre: 'Papel higiénico 4 rollos', categoria: 'Limpieza', stock: 35, precio: '$2.290' },
    { nombre: 'Bebida cola 1,5 L', categoria: 'Bebidas', stock: 52, precio: '$1.690' }
  ];

  // Sucursales del supermercado
  const tiendas = [
    { nombre: 'Sucursal Centro', direccion: 'Av. Libertador Bernardo O\'Higgins 1234, Santiago', horario: 'Lunes a domingo, 8:00 a 22:00' },
    { nombre: 'Sucursal Providencia', direccion: 'Av. Providencia 2345, Providencia', horario: 'Lunes a sábado, 9:00 a 21:00' },
    { nombre: 'Sucursal Maipú', direccion: 'Av. Pajaritos 3456, Maipú', horario: 'Lunes a domingo, 9:00 a 22:00' }
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Supermercado</h1>
        </header>

        {/* Área principal que cambia según la ruta */}
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inventario productos={productos} />} />
            <Route path="/nuestras-tiendas" element={<NuestrasTiendas tiendas={tiendas} />} />
            <Route path="/contactanos" element={<Contactanos />} />
          </Routes>
        </main>

        {/* Menú inferior */}
        <nav className="menu-inferior">
          <Link to="/">Inicio</Link>
          <Link to="/nuestras-tiendas">Nuestras tiendas</Link>
          <Link to="/contactanos">Contáctanos</Link>
        </nav>
      </div>
    </Router>
  );
}

function Inventario({ productos }) {
  return (
    <div>
      <h2>Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>{producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NuestrasTiendas({ tiendas }) {
  return (
    <div>
      <h2>Nuestras tiendas</h2>
      <table>
        <thead>
          <tr>
            <th>Tienda</th>
            <th>Dirección</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.map((tienda, index) => (
            <tr key={index}>
              <td>{tienda.nombre}</td>
              <td>{tienda.direccion}</td>
              <td>{tienda.horario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Contactanos() {
  return (
    <div>
      <h2>Contáctanos</h2>
      <p>Teléfono: +56 2 2345 6789</p>
      <p>Correo: contacto@supermercado.cl</p>

      <form className="formulario">
        <label>Nombre</label>
        <input type="text" />

        <label>Correo</label>
        <input type="email" />

        <label>Mensaje</label>
        <textarea rows="4"></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
