export function getCategoryMap(categorias) {
  return categorias.reduce((acc, categoria) => {
    acc[categoria.id] = categoria;
    return acc;
  }, {});
}

export function getHealthLabel(salud) {
  if (salud >= 85) return "Excelente";
  if (salud >= 70) return "Estable";
  if (salud >= 50) return "Atencion";
  return "Critica";
}

export function getHealthClasses(salud) {
  if (salud >= 85) return "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30";
  if (salud >= 70) return "bg-lime-400/15 text-lime-200 ring-1 ring-lime-400/30";
  if (salud >= 50) return "bg-amber-400/15 text-amber-100 ring-1 ring-amber-400/30";
  return "bg-rose-400/15 text-rose-100 ring-1 ring-rose-400/30";
}

export function getDashboardStats(plantas, cuidados) {
  const favoritas = plantas.filter((planta) => planta.es_favorita).length;
  const saludables = plantas.filter((planta) => planta.salud >= 80).length;
  const proximosCuidados = cuidados.filter((cuidado) => {
    return new Date(cuidado.proximo_cuidado) <= new Date("2026-03-24");
  }).length;

  return [
    { label: "Plantas activas", value: plantas.length },
    { label: "Favoritas", value: favoritas },
    { label: "Saludables", value: saludables },
    { label: "Cuidados cercanos", value: proximosCuidados },
  ];
}
