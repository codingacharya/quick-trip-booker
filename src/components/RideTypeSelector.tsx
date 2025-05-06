
import { Button } from "@/components/ui/button";
import { Car, Bus } from "lucide-react";
import { RideType } from "@/context/BookingContext";

interface RideTypeSelectorProps {
  selectedType: RideType;
  onSelect: (type: RideType) => void;
}

const RideTypeSelector = ({ selectedType, onSelect }: RideTypeSelectorProps) => {
  const rideTypes: { type: RideType; label: string; icon: React.ReactNode; description: string }[] = [
    {
      type: "bike",
      label: "Bike",
      icon: <Car size={24} className="mb-1" />,
      description: "Fastest & cheapest",
    },
    {
      type: "auto",
      label: "Auto",
      icon: <Bus size={24} className="mb-1" />,
      description: "Affordable comfort",
    },
    {
      type: "car",
      label: "Car",
      icon: <Car size={24} className="mb-1" />,
      description: "Premium comfort",
    },
  ];

  return (
    <div className="py-4">
      <h3 className="text-base font-medium mb-3 text-gray-700">Choose ride type</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {rideTypes.map((ride) => (
          <Button
            key={ride.type}
            onClick={() => onSelect(ride.type)}
            variant="outline"
            className={`flex-1 min-w-[100px] h-auto flex flex-col items-center py-3 ${
              selectedType === ride.type
                ? "bg-rapido-lightPurple border-rapido-purple text-rapido-purple"
                : "bg-white border-gray-200 text-gray-600"
            }`}
          >
            {ride.icon}
            <span className="font-medium">{ride.label}</span>
            <span className="text-xs mt-1 text-gray-500">{ride.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RideTypeSelector;
