import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'
import {
  Box,
  Badge,
  BadgeText,
  Text,
  ScrollView,
  ButtonGroup,
  Button,
  ButtonText
} from '@gluestack-ui/themed'
import { makeRequest } from '../../../../lib/axios'
import { Skeleton } from '@rneui/themed'
import { router } from 'expo-router'

interface BookProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationYear: string;
  publisher: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

export default function BookInactivaView() {
  const params = useLocalSearchParams()
  const [book, setBook] = useState<BookProps | null>(null)
  const [booksFromSameAuthor, setBooksFromSameAuthor] = useState<BookProps[] | null>(null)

  useEffect(() => {
    try {
      const getBook = async () => {
        const response = await makeRequest(`/book/get/${params?.bookId}`)
        const book : BookProps = response.data.data as BookProps
        setBook(book)
      }
      getBook()
    } catch (error) {
      console.log(error)
    }
  }, [params?.bookId])

  useEffect(() => {
    if (book) {
      const getBooksFromSameAuthor = async () => {
        try {
          const response = await makeRequest(`/book/get/author/${book.author}`)
          const books : BookProps[] = response.data.data as BookProps[]
          const booksWithObjectsValues = Object.values(books)
          setBooksFromSameAuthor(booksWithObjectsValues)
        } catch (error) {
          console.log(error)
        }
      }

      getBooksFromSameAuthor()
    }
  }, [book])

  if (!book) {
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
    <ScrollView padding='$10' paddingTop='$8' bgColor='$white'>
      {/* Book title and author */}
      <Box>
        <Text fontWeight='bold' fontSize='$4xl' paddingTop='$5' paddingBottom='$1' lineHeight='$4xl'>{book?.title || 'Cargando...'}</Text>
        <Text fontSize='$xl' fontWeight='semibold' paddingTop='$2'>{book?.author || 'Cargando...'}</Text>
      </Box>
      {/* Book Properties */}
      <Box paddingTop='$3'>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Género:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{`${book?.genre.charAt(0).toUpperCase()}${book?.genre.slice(1)}` || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>ISBN:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{book?.isbn || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Año de publicación:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{new Date(book.publicationYear).toLocaleDateString('es-MX').split('/', 3).slice(2, 3).join(',') || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Editorial:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{book?.publisher || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Cantidad:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{book?.quantity || 'Cargando...'}</Text>
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
          <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Registrado el:</Text>
          <Text fontSize='$lg' paddingTop='$2'>{new Date(book?.createdAt as string).toLocaleDateString('es-MX') || 'Cargando...'}</Text>
        </Box>
        {
          book?.updatedAt && (
            <Box display='flex' flexDirection='row' alignItems='center' gap='$2'>
              <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Actualizado el:</Text>
              <Text fontSize='$lg' paddingTop='$2'>{new Date(book?.updatedAt as string).toLocaleDateString('es-MX') || 'Cargando...'}</Text>
            </Box>
          )
        }
      </Box>
      {/* Book quantity in stock and in loan */}
      {/* TODO: book quantity and loan box */}
      {/* TODO: book Actions and loan box */}
      <Box paddingTop='$4' paddingBottom='$0' display='flex' flexDirection='row' alignItems='center' gap='$2'>
        <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Estado:</Text>
        <Badge bgColor={book?.status ? '$green600' : '$rose500'} marginTop='$2' display='flex' justifyContent='center' flexDirection='row' borderRadius='$md'>
          <BadgeText color='$white'>{book?.status ? 'Activo' : 'Inactivo'}</BadgeText>
        </Badge>
      </Box>
      {/* Book loan history */}
      {/* Books from the same author */}
      {
        booksFromSameAuthor && booksFromSameAuthor?.length > 1 && (
          <Box paddingTop='$6' paddingBottom='$32'>
            <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>Libros del mismo autor</Text>
            <Box paddingTop='$2'>
              {booksFromSameAuthor && booksFromSameAuthor?.map((book) => {
                if (book.id !== params?.bookId) {
                  return (
                    <Box key={book.id} padding='$4' bgColor='$gray100' borderRadius='$md' marginBottom='$4'>
                      <Text fontSize='$lg' fontWeight='bold' paddingTop='$2'>{book.title}</Text>
                      <Text fontSize='$lg' paddingTop='$2'>{book.author}</Text>
                    </Box>
                  )
                } else {
                  return null
                }
              })}
            </Box>
          </Box>
        )
      }
      <ButtonGroup space="sm" paddingTop='$8' width='$full' display='flex' justifyContent='flex-end'>
        <Button
        variant="solid"
        action={book?.status ? "negative" : "primary"}
        onPress={() => router.push(`/books/inactive/${book?.id}`)}
        >
          <ButtonText>
            {
              book?.status ? 'Inactivar' : 'Activar'
            }
          </ButtonText>
        </Button>
        <Button
        variant="solid"
        action="secondary"
        onPress={() => router.push(`/books/edit/${book?.id}`)}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </ButtonGroup>
    </ScrollView>
  )
}
