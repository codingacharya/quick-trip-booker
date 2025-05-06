
import { useState } from "react";
import { RideType } from "../context/BookingContext";

// Mock rates per km for different ride types
const RATES: Record<RideType, number> = {
  bike: 8,
  auto: 12,
  car: 18,
};

// Base fare for each ride type
const BASE_FARE: Record<RideType, number> = {
  bike: 15,
  auto: 25,
  car: 40,
};

// Mock function to calculate distance between two points
const calculateDistance = (
  pickupLat?: number,
  pickupLng?: number,
  destLat?: number,
  destLng?: number
): number => {
  // In a real app, this would use the Google Maps Distance Matrix API or similar
  // Here we're just returning a random distance between 1 and 15 km
  return Math.round((Math.random() * 14 + 1) * 10) / 10; // 1.0 to 15.0 km
};

// Calculate estimated time based on distance and ride type
const calculateDuration = (distance: number, rideType: RideType): number => {
  // Average speeds (km/h): bike: 25, auto: 30, car: 40
  const speeds: Record<RideType, number> = {
    bike: 25,
    auto: 30,
    car: 40,
  };
  
  // Calculate duration in minutes
  return Math.round((distance / speeds[rideType]) * 60);
};

export const useRideEstimation = () => {
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateFare = async (
    pickupLat?: number,
    pickupLng?: number,
    destLat?: number,
    destLng?: number,
    rideType: RideType = "bike"
  ): Promise<{ fare: number; distance: number; duration: number }> => {
    setIsCalculating(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate distance (would use real API in production)
      const distance = calculateDistance(pickupLat, pickupLng, destLat, destLng);
      
      // Calculate fare based on distance and ride type
      const baseFare = BASE_FARE[rideType];
      const distanceFare = distance * RATES[rideType];
      const fare = Math.round(baseFare + distanceFare);
      
      // Calculate duration
      const duration = calculateDuration(distance, rideType);
      
      return { fare, distance, duration };
    } finally {
      setIsCalculating(false);
    }
  };

  return { calculateFare, isCalculating };
};
