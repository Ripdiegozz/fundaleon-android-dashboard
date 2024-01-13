import React, { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import { Skeleton } from '@rneui/themed'
import { Text, Box, Icon, Badge, BadgeText, Button, Input, InputField, FormControl } from '@gluestack-ui/themed'
import { EyeIcon } from 'lucide-react-native'
import { router } from 'expo-router';
import { makeRequest } from '../../../lib/axios';

export const BooksTable = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Libro 1',
      quantity: 10,
      isbn: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '2',
      title: 'Libro 2',
      quantity: 10,
      isbn: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '3',
      title: 'Libro 3',
      quantity: 10,
      isbn: '1234567890',
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
      title: 'Libro 1',
      quantity: 10,
      isbn: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '2',
      title: 'Libro 2',
      quantity: 10,
      isbn: '1234567890',
      actions: [
        {
          key: 1,
          name: 'Editar'
        }
      ]
    },
    {
      id: '3',
      title: 'Libro 3',
      quantity: 10,
      isbn: '1234567890',
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
    const getBooks = async () => {
      try {
        const { data } = await makeRequest('book/get/all')

        interface Book {
          id: string,
          title: string,
          quantity: number,
          isbn: string,
          actions: any[]
        }

        interface BookDTO {
          id: string,
          title: string,
          quantity: number,
          isbn: string,
        }

        const dataArr : Book[] = [];

        let book : BookDTO = {
          id: '',
          title: '',
          quantity: 0,
          isbn: '',
        }

        for (book of Object.values(data.data as BookDTO[])) {
          dataArr.push({
            id: book.id,
            title: book.title,
            quantity: book.quantity,
            isbn: book.isbn,
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
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })

        setItems(dataArr)
        setOriginalItems(dataArr)
      } catch (error) {
        console.log('error')
      }
    }

    getBooks()
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    filterBooksByName(nameFilter);
  }, [nameFilter]);

  const filterBooksByName = (name: string) => {
    if (name.length > 0) {
      const filteredItems = originalItems.filter((item) => item.title.includes(name));
      setItems(filteredItems);
    }

    if (name.length === 0) {
      setItems(originalItems);
    }
  };

  return (
    <Box width='$full' bgColor='$white' display='flex' justifyContent='center' alignItems='center' padding='$4' paddingBottom='$12' borderRadius='$lg'>
      <Text fontSize='$md' fontWeight='$medium' textAlign='center' padding='$2'>Lista de Libros</Text>

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
      </Box>

      {
        items
        ? (
          <DataTable>
              <DataTable.Header>
                <DataTable.Title>Libro</DataTable.Title>
                <DataTable.Title numeric>Detalles</DataTable.Title>
              </DataTable.Header>

              {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={{}}>{item.title}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.actions.map((action, i) => (
                      <Button key={i} paddingHorizontal='$2' paddingVertical='$1' marginHorizontal='$1' marginVertical='$1' bgColor='$white' onPress={
                        () => router.push(`/books/details/${item.id}`)
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
                selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
        )
        : <Skeleton height={300} />
      }
    </Box>
  )
}
