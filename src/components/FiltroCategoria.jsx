export default function FiltroCategoria({ categorias, valor, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="filtro-categoria" className="text-sm font-medium text-gray-700">
        Categoría
      </label>
      <select
        id="filtro-categoria"
        className="campo sm:w-56"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {categorias.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
