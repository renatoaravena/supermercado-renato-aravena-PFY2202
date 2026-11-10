import { validarArticulo, formatearPrecio } from '../utils/validaciones';
import { cargarEstado, guardarEstado } from '../utils/storage';

const valido = { nombre: 'Té', categoria: 'Despensa', precio: '900', stock: '5' };

describe('validarArticulo', () => {
  it('acepta datos válidos', () => {
    expect(validarArticulo(valido, [])).toEqual({});
  });

  it('detecta campos inválidos', () => {
    const e = validarArticulo({ nombre: ' ', categoria: '', precio: '0', stock: '-1' }, []);
    expect(Object.keys(e).sort()).toEqual(['categoria', 'nombre', 'precio', 'stock']);
  });

  it('rechaza stock decimal y precio no numérico', () => {
    const e = validarArticulo({ ...valido, precio: 'abc', stock: '1.5' }, []);
    expect(e.precio).toBeDefined();
    expect(e.stock).toBeDefined();
  });

  it('rechaza nombres duplicados sin importar mayúsculas', () => {
    const e = validarArticulo({ ...valido, nombre: 'té' }, [{ nombre: 'Té' }]);
    expect(e.nombre).toMatch(/Ya existe/);
  });

  it('formatea precios en CLP', () => {
    expect(formatearPrecio(1090)).toContain('1.090');
  });
});

describe('storage', () => {
  it('guarda y carga el estado', () => {
    const estado = { inventario: [], carrito: [] };
    guardarEstado(estado);
    expect(cargarEstado()).toEqual(estado);
  });

  it('devuelve null con datos corruptos o con forma incorrecta', () => {
    localStorage.setItem('supermercado-estado', '{no es json');
    expect(cargarEstado()).toBeNull();
    localStorage.setItem('supermercado-estado', JSON.stringify({ inventario: 1 }));
    expect(cargarEstado()).toBeNull();
  });
});
