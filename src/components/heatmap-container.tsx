"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { getRioHeatmapData, type HeatmapPoint } from "@/lib/data";
import { ControlsPanel } from "./controls-panel";
import { optimizeHeatmapRadius } from "@/ai/flows/optimize-heatmap-radius-with-ai";
import { useToast } from "@/hooks/use-toast";

const RIO_CENTER = { lat: -22.9068, lng: -43.1729 };

const mapOptions = {
  center: RIO_CENTER,
  zoom: 11,
  minZoom: 9,
  maxZoom: 16,
  mapId: "1f2b96b65a4dc164",
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
};

type HeatmapContainerProps = {
  apiKey?: string;
};

export function HeatmapContainer({ apiKey }: HeatmapContainerProps) {
  if (!apiKey) {
    return (
      <div className="w-screen h-screen bg-background flex items-center justify-center text-center p-8">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl font-bold font-headline">Welcome to Templarium Heatmap</h1>
          <p className="text-destructive text-lg p-3 bg-destructive/10 rounded-lg">
            Google Maps API Key is missing.
          </p>
          <div className="text-left bg-card p-6 rounded-lg border">
            <p className="mb-4">
              To use the interactive map, you need a Google Maps API key with the <strong className="text-primary">Maps JavaScript API</strong> and <strong className="text-primary">Places API</strong> enabled.
            </p>
            <p className="mb-2">
              1. Get a key from the <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>.
            </p>
            <p className="mb-4">
              2. Create a <code>.env.local</code> file in your project's root directory.
            </p>
            <p className="mb-2">3. Add your key to the file:</p>
            <pre className="bg-muted p-4 rounded-md text-left font-code text-sm">
              {`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"`}
            </pre>
            <p className="mt-4">
              After adding the key, you may need to restart the application for the changes to take effect.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["visualization"]}>
      <MapComponent />
    </APIProvider>
  );
}

function MapComponent() {
  const [data] = useState<HeatmapPoint[]>(() => getRioHeatmapData());
  const [radius, setRadius] = useState(20);
  const [zoom, setZoom] = useState(mapOptions.zoom);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const { toast } = useToast();

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
