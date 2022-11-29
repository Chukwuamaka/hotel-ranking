import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Icon, FormControl, FormLabel, Input, Text, Select, Button } from "@chakra-ui/react";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { HotelModalProps } from "../../types/generics/modal";
import TextInput from "../reusables/TextInput";
import { Hotel, HotelBrand } from "../../types/components/home/hotel_list";
import { useRouter } from "next/router";
import { generateUniqueId } from "../../utils";

const AddHotel: FC<HotelModalProps> = ({ isOpen, onClose, data }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Hotel>(data);
  const [hotelBrands, setHotelBrands] = useState<HotelBrand[]>([]);
  const [hotelLogo, setHotelLogo] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hotelBrandsList = localStorage.getItem('hotelBrandsList');
    if (hotelBrandsList) {
      const parsedHotelBrandsList: HotelBrand[] = hotelBrandsList && JSON.parse(hotelBrandsList);
      if (hotelBrands.length !== parsedHotelBrandsList.length) {
        setHotelBrands(parsedHotelBrandsList);
      }
    }
  }, []);

  const uploadPicture = () => {

  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const updateHotelBrands = (newHotel: Hotel) => {
    const newList = hotelBrands.map(brand => {
      // Remove the hotel from its old brand
      if (brand.id === data.brand) {
        return { ...brand, hotels: brand.hotels.filter(item => item.brand !== data.brand) }
      }
      // Save the hotel to its new brand
      if (brand.id === newHotel.brand) {
        return { ...brand, hotels: [...brand.hotels, newHotel] }
      }
      return brand;
    })
    localStorage.setItem('hotelBrandsList', JSON.stringify(newList));
  }

  const addHotel = (list: Hotel[]) => {
    const newHotel = { ...formData, id: generateUniqueId() }
    const newList = [...list, newHotel];
    localStorage.setItem('hotelList', JSON.stringify(newList));
    updateHotelBrands(newHotel);
  }

  const editHotel = (id: string, list: Hotel[]) => {
    const newList = list.map(item => {
      if (item.id === id) {
        updateHotelBrands(formData);
        return formData;
      }
      return item;
    });
    localStorage.setItem('hotelList', JSON.stringify(newList));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hotelList = localStorage.getItem('hotelList');

    if (hotelList) {
      const parsedHotelList: Hotel[] = hotelList && JSON.parse(hotelList);
      if (data.id) {
        editHotel(data.id, parsedHotelList);
      } else {
        addHotel(parsedHotelList);
      }
    }
    else {
      addHotel([]);
    }

    onClose();
    router.reload();
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader px={5} pt={6} pb={0}>Add/Edit Hotel</ModalHeader>
        <ModalCloseButton mt={3} />
        <ModalBody px={7} pt='45px' pb={5}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={8} align='center'>
              <Box>
                <Box bg='brand.nearWhite' pt={5} pb={4} textAlign='center' cursor='pointer' borderRadius={4} border='1px dashed #BABABA'
                  onClick={() => fileInput.current?.click()}
                >
                  {hotelLogo ? 
                    <>
                      <Box display='inline-block' py={1} px={2} bg='rgba(106, 106, 106, 0.2)' borderRadius={30}>
                        <Icon as={PencilSquareIcon} color='white' />
                      </Box>
                      <Image src={hotelLogo} alt='Hotel logo' width={96} height={96} />
                    </>
                    :
                    <>
                      <Icon as={PhotoIcon} color='brand.blue' fontSize='300%' />
                      <Text color='brand.gray.400' mt={1} fontWeight='medium'>Tap to add hotel logo</Text>
                      <Text color='brand.gray.200' mt={0.5} fontSize={10} letterSpacing={0.4}>Required dimension (512 by 512)</Text>
                    </>
                  }
                </Box>
                <FormControl className='sr-only'>
                  <FormLabel htmlFor="hotel_logo" fontSize={13} fontWeight="medium" mb={2} className='sr-only'>Upload Hotel Logo</FormLabel>
                  <Input id="hotel_logo" type="file" name="hotel_logo" placeholder="Hotel Logo"
                    accept=".jpg,.png" border='none' ref={fileInput} onChange={uploadPicture}
                  />
                </FormControl>
              </Box>
              <TextInput required={true} id="name" value={formData.name} label="Name of hotel" changeHandler={handleChange} />
              <TextInput required={true} id="address" value={formData.address} label="Address" changeHandler={handleChange} />
              <TextInput required={true} id="city" value={formData.city} label="City" changeHandler={handleChange} />
              <TextInput required={true} id="country" value={formData.country} label="Country" changeHandler={handleChange} />
              <FormControl isRequired>
                <FormLabel htmlFor='rating' fontSize={13} fontWeight='medium' mb={2} className='sr-only'>Select rating</FormLabel>
                <Select id="rating" name="rating" value={formData.rating} aria-label="Select rating" placeholder="Rating" onChange={handleChange}>
                  {Array(5).fill('_').map((item, index) => (
                    <option key={index+1} value={index+1}>{index+1}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='brand' fontSize={13} fontWeight='medium' mb={2} className='sr-only'>Select brand</FormLabel>
                <Select id="brand" name="brand" value={formData.brand} aria-label="Select brand" placeholder="Brand" onChange={handleChange}>
                  {hotelBrands.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                    <option value="none">None</option>
                </Select>
              </FormControl>
              <Button type='submit' px={12} fontSize={14} fontWeight='normal'>Save</Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddHotel;