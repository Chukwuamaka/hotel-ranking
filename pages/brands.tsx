import { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import BrandsList from '../components/brands/BrandsList';
import Page from '../components/reusables/Page';

const HotelBrands: NextPage = () => {
  return (
    <Page title='Hotel Ranking | Brands'>
      <Box as='section' px={20} py={12} minH='83vh' bg='brand.nearWhite'>
        <Text as='h1' color='brand.lime.700' fontSize={24} fontWeight='semibold' mb={10}>Hotel Brands</Text>
        <BrandsList />
      </Box>
    </Page>
  )
}

export default HotelBrands;
