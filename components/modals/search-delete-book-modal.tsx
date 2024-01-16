import { useState, useEffect } from 'react'
import { useModal } from '../../hooks/use-modal-store'
import {
    XIcon as CloseIcon,
    SearchIcon,
    ChevronDownIcon
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
    Input,
    InputSlot,
    InputIcon,
    InputField,
    SelectTrigger,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
    Select,
    SelectInput,
    FormControl,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack
} from '@gluestack-ui/themed'
import { makeRequest } from '../../lib/axios';
import { router } from 'expo-router';

export function SearchDeleteBookModal () {
    const toast = useToast();
    const { isOpen, onClose, type } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [inputType, setInputType] = useState('ISBN');

    const isModalOpen = isOpen && type === 'deleteBook';

    const redirectTo = async () => {
      setIsLoading(true);

      if (inputType === 'ISBN') {
        try {
          const res = await makeRequest.get(`book/get/isbn/${isbn}`);
          onClose();
          return router.push(`/books/delete/${res.data.data.id}`);
        } catch (error) {
          console.log(error);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="solid" marginTop='$10'>
                  <VStack space="xs">
                    <ToastTitle>Libro no encontrado</ToastTitle>
                    <ToastDescription>
                      {
                        isbn ? (
                          <Text size='sm'>
                            El libro con ISBN <Text fontWeight='$semibold' color='$backgroundDark400'>{isbn}</Text> no existe.
                          </Text>
                        ) : (
                          <Text size='sm'>
                            El libro con título <Text fontWeight='$semibold' color='$backgroundDark400'>{title}</Text> no existe.
                          </Text>
                        )
                      }
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        } finally {
          setIsLoading(false);
          setTitle('')
          setIsbn('')
        }
      }

      if (inputType === 'TITLE') {
        try {
          const res = await makeRequest.get(`book/get/title/${title}`);
          onClose();
          return router.push(`/books/delete/${res.data.data.id}`);
        } catch (error) {
          console.log(error);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="solid" marginTop='$10'>
                  <VStack space="xs">
                    <ToastTitle>Libro no encontrado</ToastTitle>
                    <ToastDescription>
                      {
                        isbn ? (
                          <Text size='sm'>
                            El libro con ISBN <Text fontWeight='$semibold' color='$backgroundDark400'>{isbn}</Text> no existe.
                          </Text>
                        ) : (
                          <Text size='sm'>
                            El libro con título <Text fontWeight='$semibold' color='$backgroundDark400'>{title}</Text> no existe.
                          </Text>
                        )
                      }
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        } finally {
          setIsLoading(false);
          setTitle('')
          setIsbn('')
        }
      }

      return;
    }

    return (
      <Center>
        <AlertDialog
          isOpen={isModalOpen}
          onClose={onClose}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent padding='$4'>
            <AlertDialogHeader>
              <Heading size='lg'>Eliminar un título</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} size='lg' color='$darkBlue500' lineHeight='$lg' />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text size='sm'>
                Ingresa el ISBN del libro que deseas eliminar. Si no lo conoces, puedes buscarlo por título.
              </Text>
            </AlertDialogBody>
            <Select paddingVertical='$3' paddingHorizontal='$4' onValueChange={(value) => setInputType(value)} defaultValue={inputType} isDisabled={isLoading}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Opción de Búsqueda" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="ISBN" value="ISBN" />
                  <SelectItem label="Título" value="TITLE" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControl paddingHorizontal='$4' isDisabled={isLoading}>
              {
                inputType === 'ISBN' ? (
                  <Input>
                    <InputSlot pl="$3">
                      <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField placeholder="Buscar ISBN..." onChangeText={(text) => setIsbn(text)} />
                  </Input>
                ) :
                inputType === 'TITLE' ? (
                  <Input>
                    <InputSlot pl="$3">
                      <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField placeholder="Buscar Título..." onChangeText={(text) => setTitle(text)} />
                  </Input>
                )
                : <Text fontWeight='$semibold' color='$backgroundDark400'>Selecciona el tipo de búsqueda...</Text>
              }
              <AlertDialogFooter>
                <ButtonGroup space="sm">
                  <Button
                  variant="outline"
                  action="secondary"
                  onPress={redirectTo}
                  disabled={isLoading}
                  >
                    <ButtonText>Buscar</ButtonText>
                  </Button>
                </ButtonGroup>
              </AlertDialogFooter>
            </FormControl>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    );
}
