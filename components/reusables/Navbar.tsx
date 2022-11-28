import { FC } from 'react';
import { Box, Button, HStack, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import CustomLink from './CustomLink';
import AddHotel from '../home/AddHotel';

const intialModalData = {
  id: '',
  img: '',
  name: '',
  address: '',
  city: '',
  country: '',
  rating: 0,
  brand: ''
}

const Navbar: FC = () => {
  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();

  return (
    <>
      <Box as='nav' borderBottom='1px solid #F7B71D'>
        <Box display='flex' justifyContent='space-between' py={7} px={20}>
          <CustomLink href='/' color='brand.lime.700' display='inline-flex' alignItems='center' fontSize='140%' fontWeight='bold'
            _hover={{textDecor: 'none'}}
          >
            <Icon as={HomeModernIcon} />
            <Text as='h1' ml={1.5}>Hotel Ranking</Text>
          </CustomLink>
          {/* Desktop navigation */}
          <HStack spacing={8}>
            <CustomLink href='/brands' color='brand.lime.500'>Hotel Brands</CustomLink>
            <Button onClick={openAddModal}>Add hotel</Button>
          </HStack>
        </Box>
      </Box>

      <AddHotel isOpen={isAddModalOpen} onClose={closeAddModal} data={intialModalData} />
    </>
  )
}

export default Navbar;