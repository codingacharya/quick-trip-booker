
import { Button } from "@/components/ui/button";
import { Car, Clock, Route } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const RideSummary = () => {
  const { bookingState, confirmBooking } = useBooking();
  const { pickup, destination, rideType, fare, distance, duration } = bookingState;

  const rideIcons = {
    bike: <Car size={20} />,
    auto: <Bus size={20} />,
    car: <Car size={20} />
  };

  // Handle missing data case
  if (!pickup || !destination || !fare) {
    return (
      <div className="p-4 text-center">
        <p>Please select pickup and destination locations first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-slide-up">
      <h2 className="text-lg font-semibold mb-4">Ride Summary</h2>
      
      {/* Trip details */}
      <div className="space-y-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="min-w-[24px] mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 ml-1"></div>
          </div>
          <div>
            <p className="text-sm text-gray-500">PICKUP</p>
            <p className="font-medium">{pickup.address}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="min-w-[24px] mt-1">
            <div className="w-2 h-2 rounded-full bg-rapido-purple ml-1"></div>
          </div>
          <div>
            <p className="text-sm text-gray-500">DESTINATION</p>
            <p className="font-medium">{destination.address}</p>
          </div>
        </div>
      </div>
      
      {/* Ride details */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="p-2 bg-rapido-lightPurple rounded-full mb-1">
              {rideIcons[rideType]}
            </div>
            <p className="text-xs text-gray-500">RIDE TYPE</p>
            <p className="font-medium capitalize">{rideType}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-2 bg-rapido-lightPurple rounded-full mb-1">
              <Route size={20} />
            </div>
            <p className="text-xs text-gray-500">DISTANCE</p>
            <p className="font-medium">{distance} km</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-2 bg-rapido-lightPurple rounded-full mb-1">
              <Clock size={20} />
            </div>
            <p className="text-xs text-gray-500">TIME</p>
            <p className="font-medium">{duration} min</p>
          </div>
        </div>
      </div>
      
      {/* Price and confirmation */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">FARE</p>
          <p className="text-xl font-bold">₹{fare}</p>
        </div>
        <Button 
          onClick={confirmBooking}
          className="bg-rapido-purple hover:bg-purple-700 text-white"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default RideSummary;

// Mock Bus component since it's not provided by lucide-react
function Bus({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4a2 2 0 0 0-2 2v10h2" />
      <path d="M14 17H9" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  );
}
