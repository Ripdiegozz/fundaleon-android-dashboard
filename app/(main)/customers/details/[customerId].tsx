import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router/src/hooks";
import {
  Box,
  Badge,
  BadgeText,
  Text,
  ScrollView,
  ButtonGroup,
  Button,
  ButtonText,
  View,
} from "@gluestack-ui/themed";
import { makeRequest } from "../../../../lib/axios";
import { Skeleton } from "@rneui/themed";
import { router } from "expo-router";

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

export default function CustomerDetailsView() {
  const params = useLocalSearchParams();
  const [customer, setCusomer] = useState<CustomerProps | null>(null);

  useEffect(() => {
    try {
      const getCustomer = async () => {
        const response = await makeRequest(
          `/customer/get/${params?.customerId}`
        );
        const customer: CustomerProps = response.data.data as CustomerProps;
        setCusomer(customer);
      };

      getCustomer();
    } catch (error) {
      console.log(error);
    }
  }, [params?.customerId]);

  if (!customer) {
    return (
      <ScrollView padding="$10" paddingTop="$6" bgColor="$white">
        <Box>
          <Skeleton height={40} />
          <Skeleton height={20} />
        </Box>

        <Box paddingTop="$4">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="$2"
          >
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
        </Box>

        <Box
          paddingTop="$6"
          paddingBottom="$0"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="$2"
        >
          <Skeleton height={20} />
          <Skeleton height={20} />
        </Box>
      </ScrollView>
    );
  }

  return (
    <View padding="$10" paddingTop="$8" bgColor="$white" height='$full'>
      {/* customer title and author */}
      <Box>
        <Text
          fontWeight="bold"
          fontSize="$4xl"
          paddingTop="$5"
          paddingBottom="$1"
          lineHeight="$4xl"
        >
          {customer?.fullName || "Cargando..."}
        </Text>
        <Text fontSize="$xl" fontWeight="bold" paddingTop="$2">
          {`Cédula: V-${customer?.identification}` || "Cargando..."}
        </Text>
      </Box>
      {/* customer Properties */}
      <Box paddingTop="$2">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="$0"
          paddingVertical="$2"
        >
          <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
            Correo Electrónico:
          </Text>
          <Text fontSize="$lg" paddingTop="$2">
            {customer?.email || "Cargando..."}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="$0"
          paddingVertical="$2"
        >
          <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
            Dirección:
          </Text>
          <Text fontSize="$lg" paddingTop="$2">
            {customer?.address || "Cargando..."}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="$2"
          paddingTop="$2"
        >
          <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
            Ocupación:
          </Text>
          <Text fontSize="$lg" paddingTop="$2">
            {customer?.job || "Cargando..."}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="$2">
          <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
            Celular:
          </Text>
          <Text fontSize="$lg" paddingTop="$2">
            {customer?.phoneNumber || "Cargando..."}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="$2">
          <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
            Registrado el:
          </Text>
          <Text fontSize="$lg" paddingTop="$2">
            {new Date(customer?.createdAt as string).toLocaleDateString(
              "es-MX"
            ) || "Cargando..."}
          </Text>
        </Box>
        {customer?.updatedAt && (
          <Box display="flex" flexDirection="row" alignItems="center" gap="$2">
            <Text fontSize="$lg" fontWeight="bold" paddingTop="$2">
              Actualizado el:
            </Text>
            <Text fontSize="$lg" paddingTop="$2">
              {new Date(customer?.updatedAt as string).toLocaleDateString(
                "es-MX"
              ) || "Cargando..."}
            </Text>
          </Box>
        )}
        <Box paddingTop='$4' paddingBottom='$0' display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Estado:</Text>
          <Badge bgColor={customer?.status ? '$green600' : '$rose500'} marginTop='$2' display='flex' justifyContent='center' flexDirection='row' borderRadius='$md'>
            <BadgeText color='$white'>{customer?.status ? 'Activo' : 'Inactivo'}</BadgeText>
          </Badge>
        </Box>
      </Box>
      {/* TODO: customer loan history */}
      <ButtonGroup
        space="sm"
        paddingTop="$8"
        width="$full"
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          variant="solid"
          action={customer?.status ? "negative" : "primary"}
          onPress={() => router.push(`/customers/inactive/${customer?.id}`)}
        >
          <ButtonText>{customer?.status ? "Inactivar" : "Activar"}</ButtonText>
        </Button>
        <Button
          variant="solid"
          action="primary"
          onPress={() => router.push(`/customers/edit/${customer?.id}`)}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </ButtonGroup>
    </View>
  );
}
