export function CareTimeline({ cuidados }) {
  if (!cuidados.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/15 bg-white/4 p-6 text-sm text-stone-300">
        Todavia no hay cuidados cargados en este panel.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cuidados.map((cuidado) => (
        <article key={cuidado.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">{cuidado.tipo}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{cuidado.frecuencia}</h4>
            </div>
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-stone-200">
              Proximo: {cuidado.proximo_cuidado}
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-stone-300 sm:grid-cols-2">
            <p>Luz: {cuidado.luz}</p>
            <p>
              Temperatura: {cuidado.temperatura_min}°C - {cuidado.temperatura_max}°C
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-stone-300">{cuidado.notas}</p>
        </article>
      ))}
    </div>
  );
}
