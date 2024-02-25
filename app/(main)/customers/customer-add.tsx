import React, { useState } from 'react'
import {
    Box,
    ScrollView,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    ButtonGroup,
    Button,
    ButtonIcon,
    ButtonText,
    Text,
    Heading,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack
} from '@gluestack-ui/themed'
import { Skeleton } from '@rneui/themed'
import { makeRequest } from '../../../lib/axios'
import { router } from 'expo-router';

interface CustomerProps {
  id: string;
  identification: string;
  full_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string | null;
  address: string;
  job: string;
}

export default function BookEditView() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [firstNames, setFirstNames] = useState<string[]>([])
  const [lastNames, setLastNames] = useState<string[]>([])
  const [customer, setCustomer] = useState<CustomerProps | null>({
    id: '',
    identification: '',
    full_name: '',
    email: '',
    phone_number: '',
    created_at: '',
    updated_at: '',
    address: '',
    job: ''
  })

  const onSubmit = async () => {
    setIsLoading(true)

    const newCustomer = customer as CustomerProps
    // Delete blank spaces from first and last names at the beginning and end of the string
    firstNames.forEach((firstName, index) => {
      firstNames[index] = firstName.trim()
    })
    lastNames.forEach((lastName, index) => {
      lastNames[index] = lastName.trim()
    })
    // Set full name
    newCustomer.full_name = `${firstNames.join(' ')} ${lastNames.join(' ')}`
    newCustomer.created_at = new Date().toISOString()
    newCustomer.updated_at = null

    try {
      await makeRequest.post(`/customer/add`, newCustomer)
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="solid" marginTop='$10'>
              <VStack space="xs">
                <ToastTitle>Cliente Agregado</ToastTitle>
                <ToastDescription>
                  El cliente ha sido agregado a la base de datos correctamente.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
      setCustomer({
        id: '',
        identification: '',
        full_name: '',
        email: '',
        phone_number: '',
        created_at: '',
        updated_at: '',
        address: '',
        job: ''
      })
      setTimeout(() => {
        router.push('/customers/customer-list')
      }, 1200)
    } catch (error) {
      console.log(error)
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="error" variant="solid" marginTop='$10'>
              <VStack space="xs">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>
                  Ha ocurrido un error al agregar el cliente. Comprueba que no exista un cliente con la misma identificación o correo electrónico.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView padding='$10' paddingTop='$4' bgColor='$white' display='flex' flexDirection='column' gap='$4'>
        <Heading size='lg'>Agregando un cliente</Heading>
        {/* Customer Full Name*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Nombres</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => setFirstNames(text.split(' '))
              } />
            </Input>
        </FormControl>
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Apellidos</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => setLastNames(text.split(' '))
              } />
            </Input>
        </FormControl>
        {/* Customer Identification*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Identificación</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => {
                    const newCustomer = customer as CustomerProps
                    newCustomer.identification = text
                    setCustomer(newCustomer)
                  }
              } />
            </Input>
        </FormControl>
        {/* Customer Email*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Correo Electrónico</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => {
                    const newCustomer = customer as CustomerProps
                    newCustomer.email = text
                    setCustomer(newCustomer)
                  }
              } />
            </Input>
        </FormControl>
        {/* Customer Phone Number*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Número de Teléfono</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => {
                    const newCustomer = customer as CustomerProps
                    newCustomer.phone_number = text
                    setCustomer(newCustomer)
                  }
              } />
            </Input>
        </FormControl>
        {/* Customer Address*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Dirección</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => {
                    const newCustomer = customer as CustomerProps
                    newCustomer.address = text
                    setCustomer(newCustomer)
                  }
              } />
            </Input>
        </FormControl>
        {/* Customer Job*/}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Ocupación</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField onChangeText={
                  (text) => {
                    const newCustomer = customer as CustomerProps
                    newCustomer.job = text
                    setCustomer(newCustomer)
                  }
              } />
            </Input>
        </FormControl>
        {/* Submit Button */}
        <ButtonGroup space="sm" paddingTop='$4' width='$full' display='flex' justifyContent='flex-end' isDisabled={isLoading}>
            <Button
            variant="solid"
            action="negative"
            onPress={() => router.push('/books/book-list')}
            disabled={isLoading}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
            variant="solid"
            action="primary"
            onPress={onSubmit}
            disabled={isLoading}
            >
              <ButtonText>Añadir</ButtonText>
            </Button>
        </ButtonGroup>
    </ScrollView>
  )
}
