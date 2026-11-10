const estilos = {
  error: 'border-red-300 bg-red-50 text-red-700',
  exito: 'border-green-300 bg-green-50 text-green-700',
  info: 'border-gray-300 bg-white text-gray-700',
};

export default function Mensaje({ tipo = 'info', children }) {
  return (
    <div role={tipo === 'error' ? 'alert' : 'status'} className={`rounded border p-3 text-sm ${estilos[tipo]}`}>
      {children}
    </div>
  );
}
