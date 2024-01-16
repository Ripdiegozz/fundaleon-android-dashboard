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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Skeleton } from '@rneui/themed'
import { makeRequest } from '../../../lib/axios'
import { CalendarIcon } from 'lucide-react-native';
import { router } from 'expo-router';

interface BookProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publication_year: string;
  publisher: string;
  quantity: number;
  createdAt: string;
  updatedAt: string | null;
}

export default function BookEditView() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [book, setBook] = useState<BookProps | null>({
    id: '',
    title: '',
    author: '',
    genre: '',
    isbn: '',
    publication_year: '',
    publisher: '',
    quantity: 0,
    createdAt: '',
    updatedAt: '',
  })

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = async () => {
    setIsLoading(true)

    const newBook = book as BookProps
    newBook.publication_year = date.toLocaleDateString()
    newBook.createdAt = new Date().toISOString()
    newBook.updatedAt = null

    try {
      const response = await makeRequest.post(`/book/add`, newBook)
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="solid" marginTop='$10'>
              <VStack space="xs">
                <ToastTitle>Libro Agregado</ToastTitle>
                <ToastDescription>
                  El libro ha sido agregado a la base de datos correctamente.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
      setBook({
        id: '',
        title: '',
        author: '',
        genre: '',
        isbn: '',
        publication_year: '',
        publisher: '',
        quantity: 0,
        createdAt: '',
        updatedAt: '',
      })
      setTimeout(() => {
        router.push('/books/book-list')
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
                  Ha ocurrido un error al agregar el libro. Comprueba que no exista un libro con el mismo ISBN.
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
        <Heading size='lg'>Agregando un libro</Heading>
        {/* Book title and author */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Título</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.title = text
              setBook(newBook)
            }}/>
            </Input>
        </FormControl>
        {/* Book author */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Autor</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.author = text
              setBook(newBook)
            }} />
            </Input>
        </FormControl>
        {/* Book genre and publication year */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Género</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.genre = text
              setBook(newBook)
            }} />
            </Input>
        </FormControl>
        <Box paddingTop='$2'>
          <Text fontWeight='$semibold' color='$backgroundLight800'>Fecha de Publicación</Text>
          <Button onPress={showDatepicker} variant='outline' gap='$2' marginVertical='$2'>
            <ButtonIcon as={CalendarIcon} size='md' color='$blue500' />
            <ButtonText>Seleccionar Fecha</ButtonText>
          </Button>
          <Text fontWeight='$semibold'>Fecha Actual de Publicación: {date.toLocaleDateString('es-MX')}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </Box>
        {/* Book publisher and quantity */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Editorial</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.publisher = text
              setBook(newBook)
            }} />
            </Input>
        </FormControl>
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Cantidad</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.quantity = parseInt(text)
              setBook(newBook)
            }} />
            </Input>
        </FormControl>
        {/* Book ISBN */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>ISBN</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField onChangeText={(text) => {
              const newBook = book as BookProps
              newBook.isbn = text
              setBook(newBook)
            }} />
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
