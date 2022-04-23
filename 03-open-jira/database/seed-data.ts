
interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;

}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: Agregar los issues al proyecto final de React Native",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En-progreso Crear un Pull Request al proyecto final de React Native",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Terminadas Agregar Redux al proyecto",
      status: "finished",
      createdAt: Date.now(),
    },
  ]
}