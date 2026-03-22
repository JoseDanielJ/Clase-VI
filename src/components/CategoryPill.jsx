export function CategoryPill({ categoria, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(categoria.id)}
      className={[
        "rounded-full px-4 py-2 text-sm transition",
        active
          ? "bg-emerald-300 text-stone-900"
          : "bg-white/6 text-stone-200 ring-1 ring-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      <span className="mr-2">{categoria.icono_emoji}</span>
      {categoria.nombre}
    </button>
  );
}
