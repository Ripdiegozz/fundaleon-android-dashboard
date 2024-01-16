import React from 'react';
import {
    XIcon as CloseIcon
} from 'lucide-react-native'
import {
    Center,
    Button,
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Heading,
    Text,
    ButtonText,
    ButtonGroup,
    Icon,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack,
    useToast
} from '@gluestack-ui/themed'
import { makeRequest } from '../../lib/axios';
import { router } from 'expo-router';

export function ConfirmDeleteBookModal({ data, setShowAlertDialog, showAlertDialog } : { data: any, setShowAlertDialog: any, showAlertDialog: any }) {
    const toast = useToast()

    const onSubmit = async () => {
        try {
          const res = await makeRequest.delete(`book/delete/${data.id}`);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="success" variant="solid" marginTop='$10'>
                  <VStack space="xs">
                    <ToastTitle>Libro Eliminado</ToastTitle>
                    <ToastDescription>
                      El libro ha sido eliminado correctamente de la base de datos.
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
          setTimeout(() => {
            router.push('/books/book-list')
          }, 3000)
        } catch (error) {
            console.log(error);
        } finally {
            setShowAlertDialog(false);
        }
    }

    return (
      <Center h={600}>
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
          setShowAlertDialog(false);
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent padding='$4'>
            <AlertDialogHeader>
              <Heading size='lg'>Confirmación</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
                <Text size='md' paddingBottom='$2'>
                  ¿Está seguro que desea eliminar el libro <Text fontWeight='$medium'>{data.title}</Text> de la base de datos?
                </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
             <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                bg='$error600'
                action="negative"
                onPress={onSubmit}
              >
                <ButtonText>Confirmar</ButtonText>
              </Button>
               </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    );
  }
