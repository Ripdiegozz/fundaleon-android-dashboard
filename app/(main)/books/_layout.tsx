import { Stack, router } from 'expo-router';
import { Icon, Text, Button, Box } from '@gluestack-ui/themed';
import { BookIcon, LayoutDashboardIcon, HomeIcon, FileEditIcon, EyeIcon, TrashIcon, PlusCircleIcon, ChevronLeft } from "lucide-react-native"

export default () => {
    return (
        <>
            <Stack>
                {/* Show functional routes */}
                <Stack.Screen
                    name="book-list" 
                    options={{
                        headerTitle: 'Inicio',
                        headerLeft: () => <Icon as={HomeIcon} size='lg' color='$black' paddingHorizontal='$6' />,
                    }}
                />
                <Stack.Screen
                    name="edit/[bookId]"
                    options={{
                        headerTitle: 'Editar Libro',
                        headerLeft: () => <Icon as={FileEditIcon} size='lg' color='$black' paddingHorizontal='$6' />,
                        headerRight: () => (
                            <Button
                                display='flex'
                                flexDirection='row'
                                gap='$1'
                                padding='$0'
                                margin='$0'
                                alignItems='center'
                                variant='outline'
                                onPress={
                                    () => router.push('/books/book-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="book-add"
                    options={{
                        headerTitle: 'Agregar Libro',
                        headerLeft: () => <Icon as={PlusCircleIcon} size='lg' color='$black' paddingHorizontal='$6' />,
                        headerRight: () => (
                            <Button
                                display='flex'
                                flexDirection='row'
                                gap='$1'
                                padding='$0'
                                margin='$0'
                                alignItems='center'
                                variant='outline'
                                onPress={
                                    () => router.push('/books/book-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="details/[bookId]"
                    options={{
                        headerTitle: () => (
                            <Box display='flex' flexDirection='row' gap='$2'>
                                <Icon as={BookIcon} size='lg' color='$black' />
                                <Text fontSize='$xl' fontWeight='bold'>Detalles de Libro</Text>
                            </Box>
                        ),
                        headerRight: () => (
                            <Button
                                display='flex'
                                flexDirection='row'
                                gap='$1'
                                padding='$0'
                                margin='$0'
                                alignItems='center'
                                variant='outline'
                                onPress={
                                    () => router.push('/books/book-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="delete/[bookId]"
                    options={{
                        headerTitle: () => (
                            <Box display='flex' flexDirection='row' gap='$2'>
                                <Icon as={TrashIcon} size='lg' color='$black' />
                                <Text fontSize='$xl' fontWeight='bold'>Eliimnar Libro</Text>
                            </Box>
                        ),
                        headerRight: () => (
                            <Button
                                display='flex'
                                flexDirection='row'
                                gap='$1'
                                padding='$0'
                                margin='$0'
                                alignItems='center'
                                variant='outline'
                                onPress={
                                    () => router.push('/books/book-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
            </Stack>
        </>     
    )
}
