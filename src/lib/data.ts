export type HeatmapPoint = {
  lat: number;
  lng: number;
  weight: number;
};

export type SuggestedLocation = {
  name: string;
  position: { lat: number; lng: number };
  zoom: number;
};

// Data based on "OPERAÇÕES DE COMBATE A CRIMES CIBERNÉTICOS POR UF"
// UF -> { lat, lng, operations }
const UF_DATA = {
  SP: { lat: -23.5505, lng: -46.6333, operations: 256 },
  PR: { lat: -25.2521, lng: -52.0215, operations: 111 },
  MG: { lat: -18.5122, lng: -44.5550, operations: 75 },
  SC: { lat: -27.2423, lng: -50.2189, operations: 61 },
  RJ: { lat: -22.9068, lng: -43.1729, operations: 52 },
  RS: { lat: -30.0346, lng: -51.2177, operations: 50 },
  BA: { lat: -12.9777, lng: -38.5016, operations: 48 },
  DF: { lat: -15.7801, lng: -47.9292, operations: 38 },
  MT: { lat: -15.6014, lng: -56.0979, operations: 34 },
  PE: { lat: -8.0476, lng: -34.8770, operations: 32 },
  GO: { lat: -16.6869, lng: -49.2648, operations: 27 },
  CE: { lat: -3.7327, lng: -38.5267, operations: 26 },
};

// Total operations for weightingspread calculation
const totalOperations = Object.values(UF_DATA).reduce((sum, { operations }) => sum + operations, 0);


export const SUGGESTED_LOCATIONS: SuggestedLocation[] = [
  { name: 'Brasil', position: { lat: -14.235, lng: -51.9253 }, zoom: 4 },
  { name: 'São Paulo', position: { lat: -23.5505, lng: -46.6333 }, zoom: 7 },
  { name: 'Paraná', position: { lat: -25.2521, lng: -52.0215 }, zoom: 7 },
  { name: 'Minas Gerais', position: { lat: -18.5122, lng: -44.5550 }, zoom: 6 },
  { name: 'Santa Catarina', position: { lat: -27.2423, lng: -50.2189 }, zoom: 7 },
  { name: 'Rio de Janeiro', position: { lat: -22.9068, lng: -43.1729 }, zoom: 8 },
];

/**
 * Generates random data points clustered around Brazilian states (UF).
 * The number of points for each state is proportional to its number of cybercrime operations.
 */
export const getHeatmapData = (): HeatmapPoint[] => {
  const data: HeatmapPoint[] = [];
  const basePointCount = 1000; // Total points to distribute across all locations

  for (const uf in UF_DATA) {
    const { lat, lng, operations } = UF_DATA[uf as keyof typeof UF_DATA];
    
    // Determine the number of points for this UF based on its proportion of total operations
    const pointCount = Math.round((operations / totalOperations) * basePointCount);
    const spread = 0.8; // Use a consistent spread for visual clustering within the state

    for (let i = 0; i < pointCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Use a non-linear distribution to cluster points more towards the center
      const radius = Math.pow(Math.random(), 2) * spread * 2;
      
      const pointLat = lat + radius * Math.cos(angle);
      const pointLng = lng + radius * Math.sin(angle) * 1.5; // Stretch longitude for Brazil's shape

      data.push({ lat: pointLat, lng: pointLng, weight: Math.random() * 2 + 0.5 });
    }
  }

  return data;
};
