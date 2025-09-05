import { HeatmapContainer } from "@/components/heatmap-container";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <main>
      <HeatmapContainer apiKey={apiKey} />
    </main>
  );
}
