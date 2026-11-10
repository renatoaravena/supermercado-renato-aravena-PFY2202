import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const abrir = (ruta = '/') =>
  render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );

describe('Inventario agrupado y filtro', () => {
  it('muestra una sección por categoría, en orden, con sus artículos', async () => {
    abrir();
    await screen.findByText('Leche entera 1L');
    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titulos[0]).toMatch(/^Lácteos/);
    expect(titulos[1]).toMatch(/^Carnes/);
    expect(titulos).toHaveLength(7);

    const lacteos = screen.getByRole('region', { name: /Lácteos/ });
    expect(within(lacteos).getByText('Leche entera 1L')).toBeInTheDocument();
    expect(within(lacteos).getByText('Yogurt natural')).toBeInTheDocument();
    expect(within(lacteos).queryByText('Posta rosada (kg)')).not.toBeInTheDocument();
  });

  it('filtra por categoría sin perder los originales', async () => {
    const user = userEvent.setup();
    abrir();
    await screen.findByText('Leche entera 1L');

    await user.selectOptions(screen.getByLabelText('Categoría'), 'Lácteos');
    expect(screen.getByText('Leche entera 1L')).toBeInTheDocument();
    expect(screen.queryByText('Arroz grado 1 (kg)')).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);

    await user.selectOptions(screen.getByLabelText('Categoría'), '');
    expect(screen.getByText('Arroz grado 1 (kg)')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(7);
  });

  it('un artículo nuevo aparece en su categoría', async () => {
    const user = userEvent.setup();
    abrir('/agregar');
    await user.type(await screen.findByLabelText('Nombre'), 'Queso gauda');
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Lácteos');
    await user.type(screen.getByLabelText('Precio (CLP)'), '3500');
    await user.type(screen.getByLabelText('Stock'), '4');
    await user.click(screen.getByRole('button', { name: 'Guardar artículo' }));

    const lacteos = await screen.findByRole('region', { name: /Lácteos/ });
    expect(within(lacteos).getByText('Queso gauda')).toBeInTheDocument();
  });
});

describe('Agregar artículo', () => {
  it('muestra errores con datos inválidos y no guarda', async () => {
    const user = userEvent.setup();
    abrir('/agregar');
    await user.click(await screen.findByRole('button', { name: 'Guardar artículo' }));
    expect(screen.getByText(/al menos 2 caracteres/)).toBeInTheDocument();
    expect(screen.getByText('Selecciona una categoría.')).toBeInTheDocument();
  });

  it('agrega un artículo válido y vuelve al listado', async () => {
    const user = userEvent.setup();
    abrir('/agregar');
    await user.type(await screen.findByLabelText('Nombre'), 'Té verde');
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Despensa');
    await user.type(screen.getByLabelText('Precio (CLP)'), '1200');
    await user.type(screen.getByLabelText('Stock'), '7');
    await user.click(screen.getByRole('button', { name: 'Guardar artículo' }));
    expect(await screen.findByText('Té verde')).toBeInTheDocument();
  });
});

describe('Detalle y carrito', () => {
  it('artículo inexistente muestra error', async () => {
    abrir('/articulo/999');
    expect(await screen.findByRole('alert')).toHaveTextContent('no existe');
  });

  it('agregar al carrito descuenta stock y el carrito ajusta cantidades', async () => {
    const user = userEvent.setup();
    abrir('/');
    await user.click(await screen.findByText('Leche entera 1L'));
    expect(await screen.findByText('Stock disponible: 20')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(screen.getByText('Stock disponible: 19')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Carrito \(1\)/ })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Carrito/ }));
    await screen.findByRole('heading', { name: 'Carrito de compras' });
    const linea = screen.getByText('Leche entera 1L').closest('li');
    await user.click(within(linea).getByRole('button', { name: /Aumentar/ }));
    expect(within(linea).getByLabelText(/Cantidad de/)).toHaveTextContent('2');

    await user.click(within(linea).getByRole('button', { name: /Disminuir/ }));
    await user.click(within(linea).getByRole('button', { name: /Disminuir/ }));
    expect(await screen.findByText('Tu carrito está vacío.')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Ir al inventario' }));
    await user.click(await screen.findByText('Leche entera 1L'));
    expect(await screen.findByText('Stock disponible: 20')).toBeInTheDocument();
  });

  it('deshabilita agregar cuando se agota el stock', async () => {
    const user = userEvent.setup();
    abrir('/articulo/5');
    const boton = await screen.findByRole('button', { name: 'Agregar al carrito' });
    for (let i = 0; i < 8; i++) await user.click(boton);
    expect(boton).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('No hay stock');
  });

  it('finalizar compra vacía el carrito', async () => {
    const user = userEvent.setup();
    abrir('/articulo/1');
    await user.click(await screen.findByRole('button', { name: 'Agregar al carrito' }));
    await user.click(screen.getByRole('link', { name: 'Ver carrito' }));
    await user.click(await screen.findByRole('button', { name: 'Finalizar compra' }));
    expect(await screen.findByText(/Compra realizada/)).toBeInTheDocument();
  });
});

describe('Rutas', () => {
  it('ruta desconocida muestra página no encontrada', async () => {
    abrir('/xyz');
    expect(await screen.findByText('Página no encontrada')).toBeInTheDocument();
  });
});
