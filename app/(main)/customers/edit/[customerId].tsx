import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'
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
import { makeRequest } from '../../../../lib/axios'
import { router } from 'expo-router';

interface CustomerProps {
  id: string;
  identification: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string | null | Date;
  address: string;
  job: string;
}

interface CustomerDTO {
  id: string;
  identification: string;
  full_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string | null | Date;
  address: string;
  job: string;
}

export default function CustomerEditView() {
  const toast = useToast()
  const params = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerProps | null>(null)
  const [customerToEdit, setCustomerToEdit] = useState<CustomerProps | null>(null)

  useEffect(() => {
    try {
      const getcustomer = async () => {
        const response = await makeRequest(`/customer/get/${params?.customerId}`)
        const customer : CustomerProps = response.data.data as CustomerProps
        setCustomer(customer)
        setCustomerToEdit(customer)
      }
      getcustomer()
    } catch (error) {
      console.log(error)
    }
  }, [params?.customerId])

  const onSubmit = async () => {
    setIsLoading(true)
    
    const newCustomer = customerToEdit as CustomerProps
    newCustomer.updatedAt = new Date()
    // set newCustomer to DTO
    const customerDTO : CustomerDTO = {
      id: newCustomer.id,
      identification: newCustomer.identification,
      full_name: newCustomer.fullName,
      email: newCustomer.email,
      phone_number: newCustomer.phoneNumber,
      created_at: newCustomer.createdAt,
      updated_at: newCustomer.updatedAt,
      address: newCustomer.address,
      job: newCustomer.job
    }

    try {
      await makeRequest.put(`/customer/edit`, customerDTO)
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="solid" marginTop='$10'>
              <VStack space="xs">
                <ToastTitle>Cliente Editado</ToastTitle>
                <ToastDescription>
                  El cliente ha sido editado correctamente.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
      setTimeout(() => {
        router.push('/customers/customer-list')
      }, 3000)
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
                  Ha ocurrido un error al editar el cliente.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    }
  }

  if (!customer) {
    return (
      <ScrollView padding='$10' paddingTop='$6' bgColor='$white'>
        <Box>
          <Skeleton height={40} />
          <Skeleton height={20} />
        </Box>

        <Box paddingTop='$4'>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
        </Box>

        <Box paddingTop='$6' paddingBottom='$0' display='flex' flexDirection='column' alignItems='center' gap='$4'>
          <Skeleton height={20} />
          <Skeleton height={20} />
        </Box>
      </ScrollView>
    )
  }

  return (
    <ScrollView padding='$10' paddingTop='$4' bgColor='$white' display='flex' flexDirection='column' gap='$4'>
        <Heading size='lg'>Editando {customer.fullName}</Heading>
                {/* customer  fullName */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Nombre Completo</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.fullName} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.fullName = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* customer  identification */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Cédula</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.identification} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.identification = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* customer  email */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Correo Electrónico</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.email} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.email = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* customer  phoneNumber */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Teléfono</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.phoneNumber} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.phoneNumber = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* customer  address */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Dirección</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.address} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.address = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* customer  job */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
              <FormControlLabelText>Trabajo u Oficio</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder={customer.job} onChangeText={(text) => {
                const newCustomer = customerToEdit as CustomerProps
                newCustomer.job = text
                setCustomerToEdit(newCustomer)
              }}/>
            </Input>
        </FormControl>
        {/* Submit Button */}
        <ButtonGroup space="sm" paddingTop='$4' width='$full' display='flex' justifyContent='flex-end' isDisabled={isLoading}>
            <Button
            variant="solid"
            action="negative"
            onPress={() => router.push('/customers/customer-list')}
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
              <ButtonText>Editar</ButtonText>
            </Button>
        </ButtonGroup>
    </ScrollView>
  )
}
