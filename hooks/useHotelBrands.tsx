import { useEffect, useState } from "react";
import { HotelBrand } from "../types/components/home/hotel_list";

const useHotelBrands= () => {
  const [hotelBrands, setHotelBrands] = useState<HotelBrand[]>([]);

  useEffect(() => {
    const hotelBrandsList = localStorage.getItem('hotelBrandsList');
    if (hotelBrandsList) {
      const parsedHotelBrandsList: HotelBrand[] = hotelBrandsList && JSON.parse(hotelBrandsList);
      if (hotelBrands.length !== parsedHotelBrandsList.length) {
        setHotelBrands(parsedHotelBrandsList);
      }
    }
  }, []);

  return { hotelBrands }
}

export default useHotelBrands;