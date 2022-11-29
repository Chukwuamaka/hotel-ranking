import { FC, useEffect, useState } from 'react';
import { Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import HotelCard from './HotelCard';
import { Hotel, HotelListProps } from '../../types/components/home/hotel_list';

const HotelList: FC<HotelListProps> = ({ query }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const hotelList = localStorage.getItem('hotelList');
    if (hotelList) {
      const parsedHotelList: Hotel[] = hotelList && JSON.parse(hotelList);
      if (hotels.length !== parsedHotelList.length) {
        setHotels(parsedHotelList);
      }
    }
  }, []);

  return (
    <Box as='section' bg='brand.nearWhite' py={12} px={[5, 8, 20]}>
      <Text as='h2' color='brand.lime.700' mb={12} textAlign='center' fontSize={[25, 31]} fontWeight='bold' className='responsive_1440px'>
        Favourite Hotels
      </Text>
      <SimpleGrid gap={5} columns={{base: 1, md: 2, lg: 3}} placeItems='center' className='responsive_1440px'>
        {hotels.filter(hotel => hotel.name.toLowerCase().includes(query.toLowerCase()))
        .map(hotel => (
          <GridItem key={hotel.id}>
            <HotelCard data={hotel} />
          </GridItem>
        ))} 
      </SimpleGrid>
    </Box>
  )
}

export default HotelList;