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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Skeleton } from '@rneui/themed'
import { makeRequest } from '../../../../lib/axios'
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
  updatedAt: string;
}

export default function BookEditView() {
  const toast = useToast()
  const params = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [book, setBook] = useState<BookProps | null>(null)
  const [bookToEdit, setBookToEdit] = useState<BookProps | null>(null)

  useEffect(() => {
    try {
      const getBook = async () => {
        const response = await makeRequest(`/book/get/${params?.bookId}`)
        const book : BookProps = response.data.data as BookProps
        setDate(book?.publication_year ? new Date(book.publication_year) : new Date())
        setBook(book)
        setBookToEdit(book)
      }
      getBook()
    } catch (error) {
      console.log(error)
    }
  }, [params?.bookId])

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
    
    const newBook = bookToEdit as BookProps
    newBook.publication_year = date.toISOString().slice(0, 10)
    newBook.updatedAt = new Date().toLocaleDateString()

    try {
      await makeRequest.put(`/book/edit`, newBook)
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="solid" marginTop='$10'>
              <VStack space="xs">
                <ToastTitle>Libro Editado</ToastTitle>
                <ToastDescription>
                  El libro ha sido editado correctamente.
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
                  Ha ocurrido un error al editar el libro.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    }
  }

  if (!book) {
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
        <Heading size='lg'>Editando {book.title}</Heading>
        {/* Book title and author */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Título</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField placeholder={book.title} onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.title = text
              setBookToEdit(newBook)
            }}/>
            </Input>
        </FormControl>
        {/* Book author */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Autor</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField placeholder={book.author} onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.author = text
              setBookToEdit(newBook)
            }} />
            </Input>
        </FormControl>
        {/* Book genre and publication year */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Género</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField placeholder={book.genre} onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.genre = text
              setBookToEdit(newBook)
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
            <InputField placeholder={book.publisher}  onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.publisher = text
              setBookToEdit(newBook)
            }} />
            </Input>
        </FormControl>
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>Cantidad</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField placeholder={`${book.quantity}`} onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.quantity = parseInt(text)
              setBookToEdit(newBook)
            }} />
            </Input>
        </FormControl>
        {/* Book ISBN */}
        <FormControl isDisabled={isLoading} paddingTop='$2'>
            <FormControlLabel>
            <FormControlLabelText>ISBN</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField placeholder={book.isbn} onChangeText={(text) => {
              const newBook = bookToEdit as BookProps
              newBook.isbn = text
              setBookToEdit(newBook)
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
              <ButtonText>Editar</ButtonText>
            </Button>
        </ButtonGroup>
    </ScrollView>
  )
}
