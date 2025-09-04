export type HeatmapPoint = {
  lat: number;
  lng: number;
  weight: number;
};

// Center of Rio de Janeiro
const RIO_CENTER = { lat: -22.9068, lng: -43.1729 };
const POINT_COUNT = 350;
const SPREAD = 0.20;

export const getRioHeatmapData = (): HeatmapPoint[] => {
  const data: HeatmapPoint[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    // Skew points towards certain areas to create more interesting density
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * Math.random() * SPREAD;
    const lat = RIO_CENTER.lat + radius * Math.cos(angle) * 1.5;
    const lng = RIO_CENTER.lng + radius * Math.sin(angle);
    data.push({ lat, lng, weight: Math.random() * 2 + 0.5 });
  }
  return data;
};
