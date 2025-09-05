"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBoxProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export function SearchBox({ onPlaceSelect }: SearchBoxProps) {
  const map = useMap();
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!map || !inputRef.current) return;

    const pac = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ["geometry", "name", "formatted_address"],
    });
    setAutocomplete(pac);

    pac.addListener("place_changed", () => {
      const place = pac.getPlace();
      onPlaceSelect(place);
    });

    return () => {
        if (pac) {
            google.maps.event.clearInstanceListeners(pac);
        }
    };
  }, [map, onPlaceSelect]);

  return (
    <div className="absolute top-4 right-4 z-10 w-80">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                ref={inputRef}
                placeholder="Search for a location"
                className="pl-10"
            />
        </div>
    </div>
  );
}
