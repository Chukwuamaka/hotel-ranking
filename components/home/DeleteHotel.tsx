import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { Hotel } from "../../types/components/home/hotel_list";
import { HotelModalProps } from "../../types/generics/modal";

const DeleteHotel: FC<HotelModalProps> = ({ isOpen, onClose, data }) => {
  const cancelRef = useRef(null);
  const router = useRouter();

  const deleteHotel = () => {
    const hotelList = localStorage.getItem('hotelList');
    if (hotelList) {
      const parsedHotelList: Hotel[] = hotelList && JSON.parse(hotelList);
      const newList = parsedHotelList.filter(item => item.id !== data.id);
      localStorage.setItem('hotelList', JSON.stringify(newList));
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
              <Button colorScheme='red' onClick={deleteHotel}>Delete</Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteHotel;