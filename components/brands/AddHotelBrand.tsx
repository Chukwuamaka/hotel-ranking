import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { HotelBrand } from "../../types/components/home/hotel_list";
import { HotelBrandModalProps } from "../../types/generics/modal";
import { generateUniqueId } from "../../utils";
import TextInput from "../reusables/TextInput";

const AddHotelBrand: FC<HotelBrandModalProps> = ({ isOpen, onClose, data }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<HotelBrand>(data);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const addHotelBrand = (list: HotelBrand[]) => {
    const newList = [...list, { ...formData, id: generateUniqueId(), hotels: 0 }];
    localStorage.setItem('hotelBrandsList', JSON.stringify(newList));
  }

  const editHotelBrand = (id: string, list: HotelBrand[]) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return formData;
      }
      return item;
    });
    localStorage.setItem('hotelBrandsList', JSON.stringify(newList));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hotelBrandsList = localStorage.getItem('hotelBrandsList');

    if (hotelBrandsList) {
      const parsedHotelBrandsList: HotelBrand[] = hotelBrandsList && JSON.parse(hotelBrandsList);
      if (data.id) {
        editHotelBrand(data.id, parsedHotelBrandsList);
      } else {
        addHotelBrand(parsedHotelBrandsList);
      }
    }
    else {
      addHotelBrand([]);
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
              <TextInput required={true} id="name" value={formData.name} label="Name of Brand" changeHandler={handleChange} />
              <Button type='submit' px={12} fontSize={14} fontWeight='normal'>Save</Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddHotelBrand;