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
  zoom: 4,
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
  const [radius, setRadius] = useState(20);
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
        title: "✨ AI Optimization Complete",
        description: "The heatmap radius has been adjusted for optimal viewing.",
      });
    } catch (error) {
      console.error("AI optimization failed:", error);
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "The AI could not determine an optimal radius at this time.",
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
    heatmapLayer.set("opacity", 0.8);
    heatmapLayer.set("gradient", [
      "rgba(245, 245, 220, 0)", // Transparent Soft Sand Beige
      "rgba(255, 200, 0, 0.7)",  // Lighter orange
      "hsl(33, 100%, 50%)",     // Sunset Orange
      "rgba(200, 50, 0, 1)",      // Deeper red-orange
    ]);
  }, [heatmapLayer, radius]);

  return null;
}
