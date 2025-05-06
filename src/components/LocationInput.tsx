
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string | null;
  onChange: (value: string) => void;
  useCurrentLocation?: boolean;
}

const LocationInput = ({
  label,
  placeholder,
  value,
  onChange,
  useCurrentLocation = false,
}: LocationInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  // Mock suggestions for demonstration
  const suggestions = [
    "Central Mall, Main Street",
    "Downtown Train Station",
    "Airport Terminal 2",
    "City Hospital",
    "Metro Bus Station",
  ];

  const handleCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    onChange("Current Location (detected)");
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MapPin
            size={18}
            className={`${
              isFocused ? "text-rapido-purple" : "text-gray-400"
            }`}
          />
        </div>
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="pl-10 bg-white border-gray-200 focus:border-rapido-purple focus:ring-rapido-purple"
        />
        {useCurrentLocation && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rapido-purple hover:text-rapido-purple hover:bg-rapido-lightPurple"
            onClick={handleCurrentLocation}
          >
            <Navigation size={18} />
          </Button>
        )}
      </div>

      {/* Location suggestions */}
      {isFocused && (value?.length ?? 0) > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-100">
          <ul className="py-1">
            {suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes((value || "").toLowerCase())
              )
              .slice(0, 4)
              .map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm hover:bg-rapido-lightPurple cursor-pointer flex items-center gap-2"
                  onClick={() => onChange(suggestion)}
                >
                  <MapPin size={14} className="text-gray-400" />
                  <span>{suggestion}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
