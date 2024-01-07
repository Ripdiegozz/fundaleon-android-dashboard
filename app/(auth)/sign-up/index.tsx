import React, { useState } from 'react'
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
  Icon
} from '@gluestack-ui/themed'
import {
  AlertCircleIcon,
  EyeIcon, 
  EyeOffIcon,
  MailIcon,
  LockIcon,
  LibraryBig 
} from 'lucide-react-native'
import { WrongCredentialsDialog } from '../../../components/modals/wrong-credentials-modal'
import { Stack } from 'expo-router'
import { useAuth } from '../../../context/authStore'
import { router } from 'expo-router'

interface FormValues {
  email: string
  password: string
}

export default function Auth() {    
  const { login } = useAuth()
  
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof FormValues, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true)
    login(formValues.email, formValues.password).then(() => {
      setLoading(false)
      router.push('/set-up')
    }).catch((err) => {
      // Show error modal
      setLoading(false)
      setShowAlertDialog(true)
    })
  };

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <Box>
      <WrongCredentialsDialog showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} />
      <Stack.Screen options={{ headerShown: false }} />
      <FormControl
        paddingHorizontal="$8"
        paddingTop="$56"
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
        <Box mb="$10">
          <Heading lineHeight="$md">
            Bienvenido
          </Heading>
          <Text lineHeight="$md">
            Inicia sesión para continuar
          </Text>
        </Box>
        <VStack space="xl">
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={MailIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField type="text" value={formValues.email} placeholder='mail@gmail.com' onChangeText={(text) => handleInputChange('email', text)} keyboardType='email-address' />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tu email
              </FormControlHelperText>
            </FormControlHelper>
          </VStack>
          <VStack space="xs">
            <FormControlLabel>
              <FormControlLabelText lineHeight="$xs">
                Contraseña
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot pl="$3">
                <InputIcon as={LockIcon} color="$darkBlue500" />
              </InputSlot>
              <InputField type={showPassword ? "text" : "password"} value={formValues.password} placeholder="******" onChangeText={(text) => handleInputChange('password', text)} />
              <InputSlot pr="$3" onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa tu contraseña
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
      <Box width="$full" paddingTop="$32" paddingHorizontal="$12" display="flex" flexDirection="row" rowGap="$2" justifyContent="center">
        <Text textAlign="center">
          Fundación Literaria León Bienvenido Weffer.
        </Text>
      </Box>
    </Box>
  )
}
