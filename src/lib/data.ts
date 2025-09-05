export type HeatmapPoint = {
  lat: number;
  lng: number;
  weight: number;
};

// Define centers for the cities
const LOCATIONS = [
  { center: { lat: -22.9068, lng: -43.1729 }, count: 120, spread: 0.1 },   // Rio de Janeiro (South Zone / Center)
  { center: { lat: -22.87, lng: -43.35 }, count: 80, spread: 0.12 },     // Rio de Janeiro (North/West Zone)
  { center: { lat: -22.8969, lng: -43.1041 }, count: 60, spread: 0.04 },  // Niterói
  { center: { lat: -22.8239, lng: -43.0536 }, count: 50, spread: 0.05 },  // São Gonçalo
  { center: { lat: -22.9194, lng: -42.8211 }, count: 40, spread: 0.06 },  // Maricá
];

/**
 * Generates random data points clustered around predefined locations.
 * The generation logic attempts to place points on land by using a simple
 * approximation, but it is not perfect.
 */
export const getRioHeatmapData = (): HeatmapPoint[] => {
  const data: HeatmapPoint[] = [];

  LOCATIONS.forEach(({ center, count, spread }) => {
    for (let i = 0; i < count; i++) {
      // Generate points in a slightly skewed ellipse to better fit landmass
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.random() * spread;
      
      // Skewing longitude more than latitude to simulate coastal city shapes
      const lat = center.lat + radius * Math.cos(angle);
      const lng = center.lng + radius * Math.sin(angle) * 1.8; // Wider spread on longitude

      // Basic check to avoid points obviously in the water (Guanabara Bay)
      // This is a simplified boundary and might not be perfect
      const inBay = (lat > -22.9 && lat < -22.8) && (lng > -43.15 && lng < -43.05);

      if (!inBay) {
        data.push({ lat, lng, weight: Math.random() * 2 + 0.5 });
      }
    }
  });

  return data;
};
