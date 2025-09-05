"use client";

import type { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Info, LoaderCircle, Flame } from "lucide-react";
import { LocationSelector } from "./search-box";
import type { SuggestedLocation } from "@/lib/data";

type ControlsPanelProps = {
  radius: number;
  onRadiusChange: (newRadius: number) => void;
  onOptimize: () => void;
  isLoading: boolean;
  aiReasoning: string | null;
  onLocationSelect: (location: SuggestedLocation) => void;
};

export const ControlsPanel: FC<ControlsPanelProps> = ({
  radius,
  onRadiusChange,
  onOptimize,
  isLoading,
  aiReasoning,
  onLocationSelect,
}) => {
  return (
    <Card className="absolute top-4 left-4 z-10 w-96 shadow-2xl bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-primary" />
          Templarium Heatmap
        </CardTitle>
        <CardDescription>AI-powered heatmap for Rio de Janeiro</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <LocationSelector onLocationSelect={onLocationSelect} />
        <div className="space-y-2">
          <Label htmlFor="radius-slider">Radius: {radius.toFixed(0)}px</Label>
          <Slider
            id="radius-slider"
            min={1}
            max={100}
            step={1}
            value={[radius]}
            onValueChange={(value) => onRadiusChange(value[0])}
            disabled={isLoading}
          />
        </div>
        <Button onClick={onOptimize} disabled={isLoading} className="w-full transition-all duration-300">
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          AI Optimize Radius
        </Button>
      </CardContent>
      {aiReasoning && (
         <CardFooter>
            <Alert variant="default" className="bg-accent/10 border-accent/30">
              <Info className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent">AI Suggestion</AlertTitle>
              <AlertDescription>
                {aiReasoning}
              </AlertDescription>
            </Alert>
         </CardFooter>
      )}
    </Card>
  );
};
