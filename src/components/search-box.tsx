"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUGGESTED_LOCATIONS, type SuggestedLocation } from "@/lib/data";

type LocationSelectorProps = {
  onLocationSelect: (location: SuggestedLocation) => void;
};

export function LocationSelector({ onLocationSelect }: LocationSelectorProps) {
  const handleValueChange = (value: string) => {
    const selected = SUGGESTED_LOCATIONS.find(loc => loc.name === value);
    if (selected) {
      onLocationSelect(selected);
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full shadow-lg">
        <SelectValue placeholder="Select a location..." />
      </SelectTrigger>
      <SelectContent>
        {SUGGESTED_LOCATIONS.map((location) => (
          <SelectItem key={location.name} value={location.name}>
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
