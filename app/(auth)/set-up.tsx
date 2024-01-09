import { useEffect, useState } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  Text,
  VStack,
  Heading,
  Input,
  InputSlot,
  InputField,
  InputIcon,
  Button,
  ButtonText,
  Box,
  Icon,
  ScrollView
} from '@gluestack-ui/themed'
import {
  MailIcon,
  UserIcon,
  UsersIcon,
  PhoneIcon,
  FingerprintIcon,
  LibraryBig 
} from 'lucide-react-native'
import { router, Stack } from 'expo-router'
import { WrongSetupDialog } from '../../components/modals/wrong-set-up-modal'
import { makeRequest } from '../../lib/axios'
import { useAuth } from '../../context/authStore'
import { useFindUser } from '../../hooks/use-find-user'
import * as z from 'zod'

const schema = z.object({
  firstName: z.string().min(1, { message: 'Ingresa tu nombre' }),
  lastName: z.string().min(1, { message: 'Ingresa tu apellido' }),
  email: z.string().email({ message: 'Ingresa un email válido' }),
  phoneNumber: z.string().min(1, { message: 'Ingresa tu número de teléfono' }).regex(/^(0414|0424|0412|0416|0426)[0-9]{7}$/, { message: 'Ingresa un número de teléfono válido'}),
  cedula: z.string().min(1, { message: 'Ingresa tu número de cédula' }).regex(/^([0-9]{6,10})/, { message: 'Ingresa un número de cédula válido' }),
})

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  cedula: string
}

export default function SetUpPage() {
  const { user } = useFindUser()
  const { session } = useAuth()

  const [sessionNow, setSessionNow] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: session?.user?.email || '',
    phoneNumber: '',
    cedula: '',
  })

  useEffect(() => {
    if (session) {
      setSessionNow(true)
    }
  }, [])
  
  const handleInputChange = (field: keyof FormValues, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, phoneNumber, cedula } = formValues

    const test = schema.safeParse({
      firstName,
      lastName,
      email,
      phoneNumber,
      cedula,
    })
    
    if (!test.success) {
      console.log(test)
      setShowAlertDialog(true)
      return
    }

    try {
      setLoading(true)
      
      // Set fullname and delete spaces at the beginning and end
      const fullName = `${firstName} ${lastName}`.trim()

      if (!session) {
        return router.push('/sign-up')
      }

      const body = {
        id: session?.user?.id,
        email,
        full_name: fullName,
        phone_number: phoneNumber,
        cedula,
        role: 'ADMIN'
      }

      await makeRequest.post('/user/add', body, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        console.log(res)
        router.push('/dashboard')
      })
    } catch (error) {
      setShowAlertDialog(true)
      console.error('Axios Error:', error);
    } finally {
      setLoading(false)
    }  
  }

  if (user) {
    return router.push('/dashboard')
  }

  return (
    <ScrollView>
      <WrongSetupDialog showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} />
      <Stack.Screen options={{ headerShown: false }} />
      <FormControl
        paddingHorizontal="$8"
        paddingTop="$32"
        paddingBottom="$8"
        borderWidth="$0"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
        isDisabled={loading}
      >
        {/* MOCK LOGO BOX */}
        <Box
          position="absolute"
          top="$12"
          left="$8"
          width="$12"
          height="$12"
          borderRadius="$lg"
          backgroundColor="$darkBlue500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
        >
          <Icon as={LibraryBig} color="$white" size="xl" />
        </Box>
        {/* MOCK LOGO BOX */}
        <Box mb="$8">
          <Heading lineHeight="$md">
            Un paso más
          </Heading>
          <Text lineHeight="$md">
            Necesitamos que completes tu información para continuar.
          </Text>
        </Box>
        <VStack space="xl">
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Nombres
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={UserIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField 
                type="text" 
                value={formValues.firstName} 
                onChangeText={(text) => handleInputChange('firstName', text)} 
                placeholder='Nombre' 
                keyboardType='default' 
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tus nombres
              </FormControlHelperText>
            </FormControlHelper>
          </VStack>
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Apellidos
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={UsersIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField 
                type="text" 
                value={formValues.lastName} 
                onChangeText={(text) => handleInputChange('lastName', text)} 
                placeholder='Apellido' 
                keyboardType='default' 
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tus apellidos
              </FormControlHelperText>
            </FormControlHelper>
          </VStack>
          <FormControl isDisabled={sessionNow}>
            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText lineHeight="$xs">
                  Correo electrónico
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputSlot pl="$3">
                  <InputIcon as={MailIcon} color="$darkBlue500" />
                </InputSlot>
                <InputField
                  type="text"
                  value={session ? session?.user?.email : formValues.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  placeholder='Email'
                  keyboardType='email-address'
                />
              </Input>
            </VStack>
          </FormControl>
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Número de teléfono
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={PhoneIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField 
                type="text" 
                value={formValues.phoneNumber} 
                onChangeText={(text) => handleInputChange('phoneNumber', text)} 
                placeholder='(04XX)XXXXXXX' 
                keyboardType='phone-pad'
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tu número de teléfono sin guiones
              </FormControlHelperText>
            </FormControlHelper>
          </VStack>
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Cédula
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={FingerprintIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField  
                type="text" 
                value={formValues.cedula} 
                onChangeText={(text) => handleInputChange('cedula', text)} 
                placeholder='12345678' 
                keyboardType='phone-pad'
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tu cédula sin puntos ni guiones
              </FormControlHelperText>
            </FormControlHelper>
          </VStack>
          <Button
            ml="auto"
            onPress={handleSubmit}
            isDisabled={loading}
          >
            <ButtonText color="$white">Entrar</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </ScrollView>
  )
}