import { useEffect, useMemo, useState } from "react";
import { CategoryPill } from "./components/CategoryPill";
import { CareTimeline } from "./components/CareTimeline";
import { PlantCard } from "./components/PlantCard";
import { StatCard } from "./components/StatCard";
import { getPlantDashboardData } from "./services/plantService";
import { getCategoryMap, getDashboardStats } from "./utils/plants";

export default function App() {
  const [dashboard, setDashboard] = useState({
    categorias: [],
    plantas: [],
    cuidados: [],
  });
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setStatus("loading");
        const data = await getPlantDashboardData();
        setDashboard(data);
        setStatus("success");
      } catch (error) {
        console.error("Error loading plants", error);
        setStatus("error");
      }
    }

    loadDashboard();
  }, []);

  const categoryMap = useMemo(() => getCategoryMap(dashboard.categorias), [dashboard.categorias]);
  const stats = useMemo(
    () => getDashboardStats(dashboard.plantas, dashboard.cuidados),
    [dashboard.cuidados, dashboard.plantas]
  );

  const selectedPlant = useMemo(() => {
    return dashboard.plantas.find((planta) => planta.id === selectedPlantId) ?? null;
  }, [dashboard.plantas, selectedPlantId]);

  return (
    <main className="min-h-screen px-4 py-10 text-stone-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[36px] border border-white/10 bg-black/20 p-8 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">React + Tailwind + consumo de datos</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Panel base para explorar plantas, categorias y cuidados.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300">
                Esta app funciona como punto de partida para que el grupo practique fetch, estados, componentes,
                filtros y estilos con Tailwind a partir de una estructura parecida a una base de datos real.
              </p>
            </div>
            <div className="rounded-[28px] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="text-sm text-emerald-100">Sugerencia docente</p>
              <p className="mt-3 text-sm leading-6 text-stone-200">
                Cambien los datos mock por un backend real cuando el grupo ya domine props, `useEffect`, `useState`
                y renderizado condicional.
              </p>
            </div>
          </div>
        </section>

        {status === "loading" && (
          <section className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-8 text-stone-200">
            Cargando informacion de plantas...
          </section>
        )}

        {status === "error" && (
          <section className="mt-8 rounded-[28px] border border-rose-300/20 bg-rose-400/10 p-8 text-rose-100">
            Ocurrio un error al cargar los datos.
          </section>
        )}

        {status === "success" && (
          <>
            <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </section>

            <section className="mt-8">
              <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-5">
                <p className="text-sm font-medium text-white">Zona intencionalmente incompleta</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Aqui el grupo puede construir el filtro por categoria usando estado, eventos y renderizado
                  condicional.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {dashboard.categorias.map((categoria) => (
                  <CategoryPill key={categoria.id} categoria={categoria} active={false} />
                ))}
              </div>
            </section>

            <section className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Plantas</h2>
                    <p className="text-sm text-stone-300">Explora la informacion general antes de conectar un API real.</p>
                  </div>
                  <span className="rounded-full bg-white/6 px-4 py-2 text-sm text-stone-200">
                    {dashboard.plantas.length} visibles
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {dashboard.plantas.map((planta) => (
                    <PlantCard
                      key={planta.id}
                      planta={planta}
                      categoria={categoryMap[planta.categoria_id]}
                      selected={selectedPlantId === planta.id}
                      onSelect={setSelectedPlantId}
                    />
                  ))}
                </div>
              </div>

              <aside>
                <div className="rounded-[32px] border border-white/10 bg-black/15 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Detalle</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {selectedPlant ? selectedPlant.nombre : "Detalle pendiente"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-300">
                    {selectedPlant
                      ? selectedPlant.nombre_cientifico
                      : "Este panel queda como ejercicio para que el grupo cargue una planta y sus cuidados al seleccionarla."}
                  </p>

                  <div className="mt-6 grid gap-3 rounded-[24px] bg-white/5 p-4 text-sm text-stone-200 sm:grid-cols-2">
                    <p>Apodo: {selectedPlant?.apodo ?? "-"}</p>
                    <p>Edad: {selectedPlant?.edad ?? "-"}</p>
                    <p>Crecimiento: {selectedPlant?.crecimiento ?? "-"}</p>
                    <p>Favorita: {selectedPlant?.es_favorita ? "Si" : "No"}</p>
                  </div>

                  <div className="mt-6">
                    <CareTimeline cuidados={[]} />
                  </div>
                </div>
              </aside>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
