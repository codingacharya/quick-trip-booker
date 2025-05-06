
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const BookingConfirmation = () => {
  const { bookingState, resetBooking } = useBooking();
  const { pickup, destination, rideType, fare } = bookingState;

  // Generate a random booking ID
  const bookingId = `RB${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Calculate estimated arrival time (5-15 minutes from now)
  const arrivalMinutes = Math.floor(Math.random() * 10) + 5;
  const arrivalTime = new Date();
  arrivalTime.setMinutes(arrivalTime.getMinutes() + arrivalMinutes);
  const formattedTime = arrivalTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="flex flex-col items-center text-center py-8 px-4 animate-slide-up">
      <div className="mb-6 text-green-500">
        <CheckCircle size={60} />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-6">Your ride has been successfully booked.</p>
      
      <div className="bg-green-50 rounded-lg p-4 mb-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Booking ID:</span>
          <span className="font-semibold">{bookingId}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Ride Type:</span>
          <span className="font-semibold capitalize">{rideType}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Fare:</span>
          <span className="font-semibold">₹{fare}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Arrival:</span>
          <span className="font-semibold">{formattedTime} ({arrivalMinutes} mins)</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 w-full max-w-md">
        <div className="flex items-start gap-3 mb-4">
          <div className="min-w-[24px] mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 ml-1"></div>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-500">PICKUP</p>
            <p className="font-medium">{pickup?.address}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="min-w-[24px] mt-1">
            <div className="w-2 h-2 rounded-full bg-rapido-purple ml-1"></div>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-500">DESTINATION</p>
            <p className="font-medium">{destination?.address}</p>
          </div>
        </div>
      </div>
      
      <div className="text-gray-600 mb-8">
        <p>Your driver details will appear here shortly.</p>
      </div>
      
      <Button 
        onClick={resetBooking}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Book Another Ride
      </Button>
    </div>
  );
};

export default BookingConfirmation;
