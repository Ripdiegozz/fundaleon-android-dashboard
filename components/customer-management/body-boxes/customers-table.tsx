import React, { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import { Skeleton } from '@rneui/themed'
import { Text, Box, Icon, Badge, BadgeText, Button, Input, InputField, FormControl, RepeatIcon } from '@gluestack-ui/themed'
import { EyeIcon } from 'lucide-react-native'
import { router } from 'expo-router';
import { makeRequest } from '../../../lib/axios';

export const CustomersTable = () => {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfItemsPerPageList] = useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItems] = useState([
    {
      id: '1',
      full_name: 'Cliente 1',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '2',
      full_name: 'Cliente 2',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '3',
      full_name: 'Cliente 3',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    }
  ]);
  const [originalItems, setOriginalItems] = useState([
    {
      id: '1',
      full_name: 'Cliente 1',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '2',
      full_name: 'Cliente 2',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '3',
      full_name: 'Cliente 3',
      identification: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    }
  ]);
  const [nameFilter, setNameFilter] = useState('');

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    getCustomers()
    setPage(0);
  }, []);

  const getCustomers = async () => {
    setLoading(true)
    try {
      const { data } = await makeRequest('customer/get/all')

      interface Customer {
        id: string,
        identification: string,
        full_name: string,
        email: string,
        actions: any[]
      }

      interface CustomerDTO {
        id: string,
        identification: string,
        full_name: string,
        email: string,
      }

      const dataArr : Customer[] = [];

      let customer : CustomerDTO = {
        id: '',
        identification: '',
        full_name: '',
        email: ''
      }

      for (customer of Object.values(data.data as CustomerDTO[])) {
        dataArr.push({
          id: customer.id,
          identification: customer.identification,
          full_name: customer.full_name,
          email: customer.email,
          actions: [
            {
              key: 1,
              name: 'Editar'
            }
          ]
        })
      }

      // order alphabetically asc
      dataArr.sort((a, b) => {
        if (a.full_name < b.full_name) return -1
        if (a.full_name > b.full_name) return 1
        return 0
      })

      setItems(dataArr)
      setOriginalItems(dataArr)
      setLoading(false)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    filterCustomersByName(nameFilter);
  }, [nameFilter]);

  const filterCustomersByName = (name: string) => {
    if (name.length > 0) {
      const filteredItems = originalItems.filter((item) => item.full_name.includes(name));
      setItems(filteredItems);
    }

    if (name.length === 0) {
      setItems(originalItems);
    }
  };

  return (
    <Box width='$full' bgColor='$white' display='flex' justifyContent='center' alignItems='center' padding='$4' paddingBottom='$12' borderRadius='$lg'>
      <Text fontSize='$md' fontWeight='$medium' textAlign='center' padding='$2'>Lista de Clientes</Text>

      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start' width='$full' padding='$2'>
        <Text fontSize='$sm' fontWeight='$medium' textAlign='center' paddingVertical='$2'>Filtrar por nombre</Text>
        <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <FormControl width='$64'>
            <Input width='$64'>
              <InputField
                placeholder='Buscar por nombre'
                value={nameFilter}
                onChangeText={(text) => setNameFilter(text)}
                width='$full'
                marginHorizontal='$2'
                marginVertical='$1'
              />
            </Input>
          </FormControl>
          <Badge marginLeft='$4' paddingVertical='$2' paddingHorizontal='$5'>
            <BadgeText>{items.length}</BadgeText>
          </Badge>
        </Box>
          {/* Refresh button */}
          <Button
            display='flex'
            flexDirection='row'
            gap='$1'
            padding='$0'
            margin='$0'
            alignItems='center'
            variant='outline'
            onPress={getCustomers}
            marginTop='$4'
            isDisabled={loading}
          >
            <Icon as={RepeatIcon} size='md' color='$blue500' />
            <Text fontWeight='bold'>Actualizar</Text>
          </Button>
      </Box>

      {
        items
        ? (
          <DataTable>
              <DataTable.Header>
                <DataTable.Title>Cliente</DataTable.Title>
                <DataTable.Title numeric>Detalles</DataTable.Title>
              </DataTable.Header>

              {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={{}}>{item.full_name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.actions.map((action, i) => (
                      <Button key={i} paddingHorizontal='$2' paddingVertical='$1' marginHorizontal='$1' marginVertical='$1' bgColor='$white' onPress={
                        () => {
                          router.push(`/customers/details/${item.id}`)
                        }
                      }>
                          <Icon as={EyeIcon} size='md' color='$blue500' />
                      </Button>
                    ))}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Filas por página'}
              />
            </DataTable>
        )
        : <Skeleton height={300} />
      }
    </Box>
  )
}
