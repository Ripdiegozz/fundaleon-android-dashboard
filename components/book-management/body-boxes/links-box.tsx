// Sources:
import React from 'react'
import { router } from 'expo-router'
import { Text, Box, Icon, ButtonText, Button } from '@gluestack-ui/themed'
import { PlusCircleIcon, TrashIcon, FileEditIcon, EyeIcon } from 'lucide-react-native'

export const LinksBox = () => {

  return (
    <Box width='$full' paddingBottom='$4' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4' borderRadius='$lg'>
        <Box display='flex' width='$full' flexDirection='column' justifyContent='center' alignItems='center' gap='$4'>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$lg' fontWeight='$medium'>Acciones</Text>
            </Box>
            <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-around' alignItems='center' gap='$4'>
                <Button variant='outline' action='positive' display='flex' justifyContent='center' alignItems='center' gap='$2' width='$40' onPress={() => router.push('/books/book-add')}>
                    <Icon as={PlusCircleIcon} size='md' color='$black' />
                    <ButtonText fontSize='$sm' fontWeight='$medium'>Agregar</ButtonText>
                </Button>
                <Button variant='outline' action='primary' display='flex' justifyContent='center' alignItems='center' gap='$2' width='$40'>
                    <Icon as={EyeIcon} size='md' color='$black' />
                    <ButtonText fontSize='$sm' fontWeight='$medium'>Ver</ButtonText>
                </Button>
                <Button variant='outline' action='secondary' display='flex' justifyContent='center' alignItems='center' gap='$2' width='$40'>
                    <Icon as={FileEditIcon} size='md' color='$black' />
                    <ButtonText fontSize='$sm' fontWeight='$medium'>Editar</ButtonText>
                </Button>
                <Button variant='outline' action='negative' display='flex' justifyContent='center' alignItems='center' gap='$2' width='$40'>
                    <Icon as={TrashIcon} size='md' color='$black' />
                    <ButtonText fontSize='$sm' fontWeight='$medium'>Eliminar</ButtonText>
                </Button>
            </Box>
        </Box>
    </Box>
  )
}
