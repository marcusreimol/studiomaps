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

// Define centers for major Brazilian cities
const LOCATIONS = [
  { center: { lat: -23.5505, lng: -46.6333 }, count: 150, spread: 0.5 }, // São Paulo
  { center: { lat: -22.9068, lng: -43.1729 }, count: 120, spread: 0.4 }, // Rio de Janeiro
  { center: { lat: -15.8267, lng: -47.9218 }, count: 80, spread: 0.3 },  // Brasília
  { center: { lat: -12.9777, lng: -38.5016 }, count: 90, spread: 0.3 },  // Salvador
  { center: { lat: -3.7319, lng: -38.5267 }, count: 70, spread: 0.3 },   // Fortaleza
  { center: { lat: -19.9167, lng: -43.9345 }, count: 100, spread: 0.3 }, // Belo Horizonte
  { center: { lat: -3.1190, lng: -60.0217 }, count: 50, spread: 0.4 },   // Manaus
  { center: { lat: -30.0346, lng: -51.2177 }, count: 60, spread: 0.3 },  // Porto Alegre
  { center: { lat: -25.4284, lng: -49.2733 }, count: 70, spread: 0.3 },  // Curitiba
  { center: { lat: -8.0476, lng: -34.8770 }, count: 80, spread: 0.3 },   // Recife
];

export const SUGGESTED_LOCATIONS: SuggestedLocation[] = [
  { name: 'Brasil', position: { lat: -14.235, lng: -51.9253 }, zoom: 4 },
  { name: 'São Paulo', position: { lat: -23.5505, lng: -46.6333 }, zoom: 9 },
  { name: 'Rio de Janeiro', position: { lat: -22.9068, lng: -43.1729 }, zoom: 9 },
  { name: 'Brasília', position: { lat: -15.8267, lng: -47.9218 }, zoom: 9 },
  { name: 'Salvador', position: { lat: -12.9777, lng: -38.5016 }, zoom: 9 },
  { name: 'Fortaleza', position: { lat: -3.7319, lng: -38.5267 }, zoom: 9 },
];

/**
 * Generates random data points clustered around predefined locations.
 */
export const getHeatmapData = (): HeatmapPoint[] => {
  const data: HeatmapPoint[] = [];

  LOCATIONS.forEach(({ center, count, spread }) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * spread;
      
      const lat = center.lat + radius * Math.cos(angle);
      const lng = center.lng + radius * Math.sin(angle) * 1.2;

      data.push({ lat, lng, weight: Math.random() * 2 + 1 });
    }
  });

  return data;
};
