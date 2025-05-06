
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBooking, BookingProvider } from "@/context/BookingContext";
import { useRideEstimation } from "@/hooks/useRideEstimation";
import LocationInput from "@/components/LocationInput";
import RideTypeSelector from "@/components/RideTypeSelector";
import RideSummary from "@/components/RideSummary";
import BookingConfirmation from "@/components/BookingConfirmation";

const BookingApp = () => {
  const { bookingState, setPickup, setDestination, setRideType, setFareDetails, currentStep, nextStep, prevStep } = useBooking();
  const { calculateFare, isCalculating } = useRideEstimation();
  
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(null);

  useEffect(() => {
    if (pickupAddress) {
      setPickup({ address: pickupAddress });
    }
  }, [pickupAddress, setPickup]);

  useEffect(() => {
    if (destinationAddress) {
      setDestination({ address: destinationAddress });
    }
  }, [destinationAddress, setDestination]);

  const handleEstimateFare = async () => {
    if (bookingState.pickup && bookingState.destination) {
      const { fare, distance, duration } = await calculateFare(
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        bookingState.rideType
      );
      setFareDetails(fare, distance, duration);
      nextStep();
    }
  };

  if (bookingState.bookingConfirmed) {
    return <BookingConfirmation />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-rapido-purple text-white p-4 mb-4">
        <h1 className="text-xl font-bold">Rapido</h1>
      </header>

      <div className="container max-w-lg mx-auto px-4">
        <Card className="overflow-hidden shadow-md">
          {currentStep === 0 ? (
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Book Your Ride</h2>
              
              <div className="space-y-4 mb-6">
                <LocationInput
                  label="Pickup Location"
                  placeholder="Enter pickup location"
                  value={pickupAddress}
                  onChange={setPickupAddress}
                  useCurrentLocation={true}
                />
                
                <LocationInput
                  label="Destination"
                  placeholder="Enter destination"
                  value={destinationAddress}
                  onChange={setDestinationAddress}
                />
              </div>
              
              <RideTypeSelector 
                selectedType={bookingState.rideType}
                onSelect={setRideType}
              />
              
              <div className="mt-4">
                <Button
                  onClick={handleEstimateFare}
                  disabled={!bookingState.pickup || !bookingState.destination || isCalculating}
                  className="w-full bg-rapido-purple hover:bg-purple-700 text-white"
                >
                  {isCalculating ? "Calculating Fare..." : "Get Fare Estimate"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-gray-100">
                <Button
                  variant="ghost" 
                  size="sm" 
                  className="pl-0" 
                  onClick={prevStep}
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back
                </Button>
              </div>
              <RideSummary />
            </div>
          )}
        </Card>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          By booking, you agree to our terms and conditions.
        </div>
      </div>
    </div>
  );
};

// Wrapper component with context provider
const Index = () => {
  return (
    <BookingProvider>
      <BookingApp />
    </BookingProvider>
  );
};

export default Index;

// Mock ArrowLeft component since it wasn't properly imported
function ArrowLeft({ size, className }: { size: number, className?: string }) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
