import ArticuloCard from './ArticuloCard';

export default function SeccionCategoria({ categoria, articulos }) {
  return (
    <section aria-labelledby={`cat-${categoria}`} className="space-y-3">
      <h2
        id={`cat-${categoria}`}
        className="border-b-2 border-brand-primary pb-1 text-xl font-semibold text-brand-secondary"
      >
        {categoria} <span className="text-sm font-normal text-gray-500">({articulos.length})</span>
      </h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {articulos.map((a) => (
          <ArticuloCard key={a.id} articulo={a} />
        ))}
      </div>
    </section>
  );
}
