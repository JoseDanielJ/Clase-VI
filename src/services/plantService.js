import { categorias, plantas, cuidados } from "../data/mockData";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPlantDashboardData() {
  await wait(500);

  return {
    categorias,
    plantas,
    cuidados,
  };
}

export async function getPlantById(id) {
  await wait(200);

  return plantas.find((planta) => planta.id === id) ?? null;
}
