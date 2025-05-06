
import { createContext, useContext, useState, ReactNode } from "react";

export type RideType = "bike" | "auto" | "car";

interface Location {
  address: string;
  lat?: number;
  lng?: number;
}

interface BookingState {
  pickup: Location | null;
  destination: Location | null;
  rideType: RideType;
  fare: number | null;
  distance: number | null;
  duration: number | null;
  bookingConfirmed: boolean;
}

interface BookingContextType {
  bookingState: BookingState;
  setPickup: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
  setRideType: (type: RideType) => void;
  setFareDetails: (fare: number, distance: number, duration: number) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  pickup: null,
  destination: null,
  rideType: "bike",
  fare: null,
  distance: null,
  duration: null,
  bookingConfirmed: false,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);
  const [currentStep, setCurrentStep] = useState(0);

  const setPickup = (location: Location | null) => {
    setBookingState((prev) => ({ ...prev, pickup: location }));
  };

  const setDestination = (location: Location | null) => {
    setBookingState((prev) => ({ ...prev, destination: location }));
  };

  const setRideType = (type: RideType) => {
    setBookingState((prev) => ({ ...prev, rideType: type }));
  };

  const setFareDetails = (fare: number, distance: number, duration: number) => {
    setBookingState((prev) => ({
      ...prev,
      fare,
      distance,
      duration,
    }));
  };

  const confirmBooking = () => {
    setBookingState((prev) => ({ ...prev, bookingConfirmed: true }));
  };

  const resetBooking = () => {
    setBookingState(initialState);
    setCurrentStep(0);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setPickup,
        setDestination,
        setRideType,
        setFareDetails,
        confirmBooking,
        resetBooking,
        currentStep,
        goToStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
