import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabin";
import { getBookings } from "@/services/apiBooking";

export interface Cabin {
  id: string;
  name: string;
  regularPrice: number;
  maxCapacity: number;
}

export interface Booking {
  cabin: {
    name: string;
  };
  endDate: string;
}

interface CabinFilter {
  checkInDate: string;
  numberOfGuests: number;
  priceRange: [number, number];
}

export function useAvailableCabins({
  checkInDate,
  numberOfGuests,
  priceRange,
}: CabinFilter) {
  // Fetch available cabins based on the check-in date, number of guests, and price range
  return useQuery<Cabin[]>(
    ["cabins", checkInDate, numberOfGuests, priceRange],
    async () => {
      const [cabins, bookings] = await Promise.all([
        getCabins(),
        getBookings({}).then((res) => res.bookings),
      ]);

      const desiredCheckInDate = new Date(checkInDate);

      const unavailableCabinNames = bookings
        .filter((booking: Booking) => {
          const bookingEndDate = new Date(booking.endDate);
          return (
            bookingEndDate >= desiredCheckInDate &&
            booking.cabin.name !== undefined
          );
        })
        .map((booking: Booking) => booking.cabin.name);

      const availableCabins = cabins.filter((cabin: Cabin) => {
        const isAvailable = !unavailableCabinNames.includes(cabin.name);

        const withinPriceRange =
          cabin.regularPrice >= priceRange[0] &&
          cabin.regularPrice <= priceRange[1];

        const hasEnoughCapacity = cabin.maxCapacity >= numberOfGuests;

        return isAvailable && withinPriceRange && hasEnoughCapacity;
      });

      return availableCabins;
    }
  );
}
