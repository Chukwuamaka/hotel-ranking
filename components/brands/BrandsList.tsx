import { Box, Button, Flex, Input, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import { HotelBrand } from "../../types/components/home/hotel_list";
import AddHotelBrand from "./AddHotelBrand";
import HotelBrandItem from "./HotelBrandItem";

const initialModalData: HotelBrand = {
  id: '',
  name: '',
  hotels: 0
}

const BrandsList: FC = ({ ...props }) => {
  const [hotelBrands, setHotelBrands] = useState<HotelBrand[]>([]);
  const { searchQuery, updateSearchQuery } = useSearch();
  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();

  useEffect(() => {
    const hotelBrandsList = localStorage.getItem('hotelBrandsList');
    if (hotelBrandsList) {
      const parsedHotelBrandsList: HotelBrand[] = hotelBrandsList && JSON.parse(hotelBrandsList);
      if (hotelBrands.length !== parsedHotelBrandsList.length) {
        setHotelBrands(parsedHotelBrandsList);
      }
    }
  }, []);

  return (
    <Box bg='white' py={9} px='30px' mt={9} borderRadius={10} boxShadow='0px 2px 15px rgba(0, 0, 0, 0.02)' {...props}>
      <Flex justify='space-between'>
        <Input type='search' placeholder='Search hotel brand' maxW='40%' onChange={(e) => updateSearchQuery(e.target.value)} />
        <Button variant='outline' fontSize={14} fontWeight='normal' onClick={openAddModal}>Add Brand</Button>
      </Flex>
      <TableContainer mt={8}>
        <Table>
          <TableCaption className='sr-only'>List of Hotel Brands</TableCaption>
          <Thead>
            <Tr>
              <Th color='brand.gray.300' borderColor='brand.gray.100' borderY='0.5px solid #BABABA' fontSize={14} fontWeight='normal' textTransform='none'>Brand Name</Th>
              <Th color='brand.gray.300' borderColor='brand.gray.100' borderY='0.5px solid #BABABA' fontSize={14} fontWeight='normal' textTransform='none'>ID</Th>
              <Th color='brand.gray.300' borderColor='brand.gray.100' borderY='0.5px solid #BABABA' fontSize={14} fontWeight='normal' textTransform='none'>No. of Hotels</Th>
              <Th color='brand.gray.300' borderColor='brand.gray.100' borderY='0.5px solid #BABABA' fontSize={14} fontWeight='normal' textTransform='none'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hotelBrands.filter(brand => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(brand => (
              <HotelBrandItem key={brand.id} brand={brand} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AddHotelBrand data={initialModalData} isOpen={isAddModalOpen} onClose={closeAddModal} />
    </Box>
  )
}

export default BrandsList;