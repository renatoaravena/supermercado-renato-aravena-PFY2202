import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS } from '../data/inventarioInicial';
import { validarArticulo } from '../utils/validaciones';
import CampoFormulario from '../components/CampoFormulario';

const formularioVacio = { nombre: '', categoria: '', precio: '', stock: '' };

export default function AgregarArticulo() {
  const { inventario, agregarArticulo } = useInventario();
  const navigate = useNavigate();
  const [form, setForm] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const erroresNuevos = validarArticulo(form, inventario);
    setErrores(erroresNuevos);
    if (Object.keys(erroresNuevos).length > 0) return;

    agregarArticulo({
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
    navigate('/');
  };

  return (
    <section className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Agregar artículo</h1>
      <form onSubmit={enviar} noValidate className="tarjeta space-y-4">
        <CampoFormulario id="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input id="nombre" name="nombre" className="campo" value={form.nombre} onChange={cambiar} />
        </CampoFormulario>

        <CampoFormulario id="categoria" etiqueta="Categoría" error={errores.categoria}>
          <select id="categoria" name="categoria" className="campo" value={form.categoria} onChange={cambiar}>
            <option value="">Selecciona...</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </CampoFormulario>

        <CampoFormulario id="precio" etiqueta="Precio (CLP)" error={errores.precio}>
          <input id="precio" name="precio" type="number" min="0" className="campo" value={form.precio} onChange={cambiar} />
        </CampoFormulario>

        <CampoFormulario id="stock" etiqueta="Stock" error={errores.stock}>
          <input id="stock" name="stock" type="number" min="0" className="campo" value={form.stock} onChange={cambiar} />
        </CampoFormulario>

        <button type="submit" className="btn-primary w-full">Guardar artículo</button>
      </form>
    </section>
  );
}
