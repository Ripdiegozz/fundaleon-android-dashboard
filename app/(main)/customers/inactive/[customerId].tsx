import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'
import {
  Box,
  Text,
  ScrollView,
  ButtonGroup,
  Button,
  ButtonText,
  BadgeText,
  Badge,
  View
} from '@gluestack-ui/themed'
import { makeRequest } from '../../../../lib/axios'
import { Skeleton } from '@rneui/themed'
import { router } from 'expo-router'
import { ConfirmStatusCustomerModal } from '../../../../components/modals/confirm-delete-customer-modal'

interface CustomerProps {
  id: string;
  identification: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string | null;
  address: string;
  job: string;
  status: boolean;
}

export default function CustomerInactivateView() {
  const params = useLocalSearchParams();
  const [customer, setCusomer] = useState<CustomerProps | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  useEffect(() => {
    try {
      const getCustomer = async () => {
        const response = await makeRequest(`/customer/get/${params?.customerId}`)
        const customer : CustomerProps = response.data.data as CustomerProps
        setCusomer(customer)
      }

      getCustomer()
    } catch (error) {
      console.log(error)
    }
  }, [params?.customerId])

  if (!customer) {
    return (
      <ScrollView padding='$10' paddingTop='$6' bgColor='$white'>
        <Box>
          <Skeleton height={40} />
          <Skeleton height={20} />
        </Box>

        <Box paddingTop='$4'>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' gap='$2'>
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
        </Box>

        <Box paddingTop='$6' paddingBottom='$0' display='flex' flexDirection='column' alignItems='center' gap='$2'>
          <Skeleton height={20} />
          <Skeleton height={20} />
        </Box>
      </ScrollView>
    )
  }

  return (
    <View padding='$10' paddingTop='$8' bgColor='$white' height='$full'>
       <Text fontSize='$4xl' fontWeight='bold' paddingBottom='$2' paddingTop='$0' lineHeight='$4xl'>{customer?.status ? "Inactivar" : "Activar"} cliente: {customer?.fullName || 'Cargando...'}</Text>
      {/* customer title and author */}
      <Box>
        <Text fontSize='$xl' fontWeight='bold' paddingTop='$2'>{`Cédula: V-${customer?.identification}` || 'Cargando...'}</Text>
      </Box>
      {/* customer Properties */}
      <Box paddingTop='$2'>
        <Box display='flex' flexDirection='column' alignItems='flex-start' gap='$0' paddingVertical='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Correo Electrónico:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{customer?.email || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='flex-start' gap='$0' paddingVertical='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Dirección:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{customer?.address || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2' paddingTop='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Ocupación:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{customer?.job || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Celular:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{customer?.phoneNumber || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Registrado el:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{new Date(customer?.createdAt as string).toLocaleDateString('es-MX') || 'Cargando...'}</Text>
        </Box>
        {
          customer?.updatedAt && (
            <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
              <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Actualizado el:</Text>
              <Text fontSize='$lg' paddingTop='$2'>{new Date(customer?.updatedAt as string).toLocaleDateString('es-MX') || 'Cargando...'}</Text>
            </Box>
          )
        }
        <Box paddingTop='$4' paddingBottom='$0' display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Estado:</Text>
          <Badge bgColor={customer?.status ? '$green600' : '$rose500'} marginTop='$2' display='flex' justifyContent='center' flexDirection='row' borderRadius='$md'>
            <BadgeText color='$white'>{customer?.status ? 'Activo' : 'Inactivo'}</BadgeText>
          </Badge>
        </Box>
      </Box>
      {/* customers from the same author */}
      <ButtonGroup space="sm" paddingTop='$8' width='$full' display='flex' justifyContent='flex-end'>
        <Button
        variant="solid"
        action="negative"
        onPress={() => router.push(`/customers/customer-list`)}
        >
          <ButtonText>Cancelar</ButtonText>
        </Button>
        <Button
        variant="solid"
        action="primary"
        onPress={() => setShowAlertDialog(true)}
        >
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </ButtonGroup>
      <ConfirmStatusCustomerModal
        data={customer}
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
      />
    </View>
  )
}
