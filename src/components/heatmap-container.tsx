"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { getHeatmapData, type HeatmapPoint, type SuggestedLocation } from "@/lib/data";
import { ControlsPanel } from "./controls-panel";
import { optimizeHeatmapRadius } from "@/ai/flows/optimize-heatmap-radius-with-ai";
import { useToast } from "@/hooks/use-toast";

const BRAZIL_CENTER = { lat: -14.235, lng: -51.9253 };

const mapOptions = {
  center: BRAZIL_CENTER,
  zoom: 5,
  minZoom: 4,
  maxZoom: 18,
  mapId: "1f2b96b65a4dc164",
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
};

type HeatmapContainerProps = {
  apiKey: string;
};

export function HeatmapContainer({ apiKey }: HeatmapContainerProps) {
  return (
    <APIProvider apiKey={apiKey} libraries={["visualization", "places"]}>
      <MapComponent />
    </APIProvider>
  );
}

function MapComponent() {
  const [data] = useState<HeatmapPoint[]>(() => getHeatmapData());
  const [radius, setRadius] = useState(12);
  const [zoom, setZoom] = useState(mapOptions.zoom);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const { toast } = useToast();
  const map = useMap();

  const handleOptimizeRadius = useCallback(async () => {
    setIsLoading(true);
    setAiReasoning(null);
    try {
      const result = await optimizeHeatmapRadius({
        zoomLevel: zoom,
        dataPointDensity: data.length,
        currentRadius: radius,
      });
      setRadius(result.optimizedRadius);
      setAiReasoning(result.reasoning);
      toast({
        title: "✨ Otimização por IA Concluída",
        description: "O raio do mapa de calor foi ajustado para uma visualização otimizada.",
      });
    } catch (error) {
      console.error("AI optimization failed:", error);
      toast({
        variant: "destructive",
        title: "Otimização Falhou",
        description: "A IA não conseguiu determinar um raio ideal neste momento.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [zoom, data.length, radius, toast]);
  
  const handleLocationSelect = useCallback(
    (location: SuggestedLocation) => {
      if (!map) return;
      map.panTo(location.position);
      map.setZoom(location.zoom);
      setZoom(location.zoom);
    },
    [map]
  );

  return (
    <div className="h-screen w-screen relative bg-background">
      <Map {...mapOptions} onZoomChanged={(e) => setZoom(e.detail.zoom)}>
        <HeatmapLayer data={data} radius={radius} />
      </Map>
      <ControlsPanel
        radius={radius}
        onRadiusChange={setRadius}
        onOptimize={handleOptimizeRadius}
        isLoading={isLoading}
        aiReasoning={aiReasoning}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
}

function HeatmapLayer({ data, radius }: { data: HeatmapPoint[]; radius: number }) {
  const map = useMap();
  const [heatmapLayer, setHeatmapLayer] = useState<google.maps.visualization.HeatmapLayer | null>(null);

  const heatmapData = useMemo(() => {
    if (typeof window === "undefined" || !window.google?.maps?.visualization) return [];
    return data.map(
      (point) => ({
        location: new window.google.maps.LatLng(point.lat, point.lng),
        weight: point.weight,
      })
    );
  }, [data]);

  useEffect(() => {
    if (!map || !heatmapData.length) return;
    const layer = new google.maps.visualization.HeatmapLayer({
      map,
      data: heatmapData,
    });
    setHeatmapLayer(layer);
    return () => {
      layer.setMap(null);
    };
  }, [map, heatmapData]);

  useEffect(() => {
    if (!heatmapLayer) return;
    heatmapLayer.set("radius", radius);
    heatmapLayer.set("dissipating", true);
    heatmapLayer.set("opacity", 0.7);
    heatmapLayer.set("gradient", [
      "rgba(0, 255, 255, 0)",
      "rgba(0, 255, 255, 1)",
      "rgba(0, 191, 255, 1)",
      "rgba(0, 127, 255, 1)",
      "rgba(0, 63, 255, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(0, 0, 223, 1)",
      "rgba(0, 0, 191, 1)",
      "rgba(0, 0, 159, 1)",
      "rgba(0, 0, 127, 1)",
      "rgba(63, 0, 91, 1)",
      "rgba(127, 0, 63, 1)",
      "rgba(191, 0, 31, 1)",
      "rgba(255, 0, 0, 1)",
    ]);
  }, [heatmapLayer, radius]);

  return null;
}
