import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { HotelBrand } from "../../types/components/home/hotel_list";
import { HotelBrandModalProps } from "../../types/generics/modal";

const DeleteHotelBrand: FC<HotelBrandModalProps> = ({ isOpen, onClose, data }) => {
  const cancelRef = useRef(null);
  const router = useRouter();

  const deleteHotelBrand = () => {
    const hotelBrandsList = localStorage.getItem('hotelBrandsList');
    if (hotelBrandsList) {
      const parsedHotelBrandsList: HotelBrand[] = hotelBrandsList && JSON.parse(hotelBrandsList);
      const newList = parsedHotelBrandsList.filter(item => item.id !== data.id);
      localStorage.setItem('hotelBrandsList', JSON.stringify(newList));
    }

    onClose();
    router.reload();
  }

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader color='brand.lime.700' fontSize='lg' fontWeight='bold'>
            Delete Hotel
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup spacing={3}>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={deleteHotelBrand}>Delete</Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteHotelBrand;