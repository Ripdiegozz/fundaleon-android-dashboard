import { Stack, router } from 'expo-router';
import { Icon, Text, Button, Box } from '@gluestack-ui/themed';
import { BookIcon, LayoutDashboardIcon, HomeIcon, FileEditIcon, EyeIcon, TrashIcon, PlusCircleIcon, ChevronLeft } from "lucide-react-native"

export default () => {
    return (
        <>
            <Stack>
                {/* Show functional routes */}
                <Stack.Screen
                    name="customer-list" 
                    options={{
                        headerTitle: 'Inicio',
                        headerLeft: () => <Icon as={HomeIcon} size='lg' color='$black' paddingHorizontal='$6' />,
                    }}
                />
                <Stack.Screen
                    name="edit/[customerId]"
                    options={{
                        headerTitle: 'Editar Cliente',
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
                                    () => router.push('/customers/customer-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="customer-add"
                    options={{
                        headerTitle: 'Agregar Cliente',
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
                                    () => router.push('/customers/customer-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="details/[customerId]"
                    options={{
                        headerTitle: () => (
                            <Box display='flex' flexDirection='row' gap='$2'>
                                <Icon as={BookIcon} size='lg' color='$black' />
                                <Text fontSize='$xl' fontWeight='bold'>Detalles de Cliente</Text>
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
                                    () => router.push('/customers/customer-list')
                                }
                            >
                                <Text fontWeight='bold'>Volver</Text>
                            </Button>
                        )
                    }}
                />
                <Stack.Screen
                    name="delete/[customerId]"
                    options={{
                        headerTitle: () => (
                            <Box display='flex' flexDirection='row' gap='$2'>
                                <Icon as={TrashIcon} size='lg' color='$black' />
                                <Text fontSize='$xl' fontWeight='bold'>Eliminar Cliente</Text>
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
                                    () => router.push('/customers/customer-list')
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
