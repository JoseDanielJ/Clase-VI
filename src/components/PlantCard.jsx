import { getHealthClasses, getHealthLabel } from "../utils/plants";

export function PlantCard({ planta, categoria, selected, onSelect }) {
  return (
    <article
      className={[
        "rounded-[28px] border p-5 transition",
        selected
          ? "border-emerald-300 bg-emerald-300/10 shadow-lg shadow-emerald-950/20"
          : "border-white/10 bg-black/15 hover:border-white/20 hover:bg-white/6",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl">{planta.icono_emoji}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{planta.nombre}</h3>
          <p className="text-sm text-stone-300">{planta.apodo}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getHealthClasses(planta.salud)}`}>
          {getHealthLabel(planta.salud)}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-stone-300">{planta.descripcion}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-200">
        <span className="rounded-full bg-white/6 px-3 py-1">{categoria?.nombre ?? "Sin categoria"}</span>
        <span className="rounded-full bg-white/6 px-3 py-1">Crecimiento: {planta.crecimiento}</span>
        <span className="rounded-full bg-white/6 px-3 py-1">Salud: {planta.salud}%</span>
      </div>

      <button
        type="button"
        onClick={() => onSelect?.(planta.id)}
        className="mt-5 w-full rounded-2xl bg-stone-100 px-4 py-3 font-medium text-stone-900 transition hover:bg-emerald-200"
      >
        Seleccionar planta
      </button>
    </article>
  );
}
