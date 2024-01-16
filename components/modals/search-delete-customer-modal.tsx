import { useState } from 'react'
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
import { router } from 'expo-router';
import { makeRequest } from '../../lib/axios';

export function SearchDeleteCustomerModal () {
    const toast = useToast();
    const { isOpen, onClose, type } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [identification, setIdentification] = useState('');
    const [email, setEmail] = useState('');
    const [inputType, setInputType] = useState('Cédula');

    const isModalOpen = isOpen && type === 'deleteCustomer';

    const redirectTo = async () => {
      setIsLoading(true);

      if (inputType === 'Cédula') {
        try {
          const res = await makeRequest.get(`customer/get/identification/${identification}`);
          onClose();
          return router.push(`/customers/delete/${res.data.data.id}`);
        } catch (error) {
          console.log(error);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="solid" marginTop='$10'>
                  <VStack space="xs">
                    <ToastTitle>Cliente no encontrado</ToastTitle>
                    <ToastDescription>
                      {
                        identification ? (
                          <Text size='sm'>
                            El cliente con identification <Text fontWeight='$semibold' color='$backgroundDark400'>{identification}</Text> no existe.
                          </Text>
                        ) : (
                          <Text size='sm'>
                            El Cliente con email <Text fontWeight='$semibold' color='$backgroundDark400'>{email}</Text> no existe.
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
          setEmail('')
          setIdentification('')
        }
      }

      if (inputType === 'Email') {
        try {
          const res = await makeRequest.get(`customer/get/email/${email}`);
          onClose();
          return router.push(`/customers/delete/${res.data.data.id}`);
        } catch (error) {
          console.log(error);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="solid" marginTop='$10'>
                  <VStack space="xs">
                    <ToastTitle>Cliente no encontrado</ToastTitle>
                    <ToastDescription>
                      {
                        identification ? (
                          <Text size='sm'>
                            El cliente con identification <Text fontWeight='$semibold' color='$backgroundDark400'>{identification}</Text> no existe.
                          </Text>
                        ) : (
                          <Text size='sm'>
                            El cliente con email <Text fontWeight='$semibold' color='$backgroundDark400'>{email}</Text> no existe.
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
          setEmail('')
          setIdentification('')
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
              <Heading size='lg'>Eliminar un cliente</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} size='lg' color='$darkBlue500' lineHeight='$lg' />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text size='sm'>
                Ingresa la cédula del cliente que deseas eliminar. Si no la conoces, puedes buscarlo por email.
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
                  <SelectItem label="Cédula" value="Cédula" />
                  <SelectItem label="Email" value="Email" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControl paddingHorizontal='$4' isDisabled={isLoading}>
              {
                inputType === 'Cédula' ? (
                  <Input>
                    <InputSlot pl="$3">
                      <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField placeholder="Buscar cédula..." onChangeText={(text) => setIdentification(text)} />
                  </Input>
                ) :
                inputType === 'Email' ? (
                  <Input>
                    <InputSlot pl="$3">
                      <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField placeholder="Buscar email..." onChangeText={(text) => setEmail(text)} />
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
                    <ButtonText>Eliminar</ButtonText>
                  </Button>
                </ButtonGroup>
              </AlertDialogFooter>
            </FormControl>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    );
}
