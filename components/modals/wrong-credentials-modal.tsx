import { useState } from 'react'
import {
    XIcon as CloseIcon
} from 'lucide-react-native'
import {
    Center,
    Button,
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Heading,
    Text,
    ButtonText,
    ButtonGroup,
    Icon
} from '@gluestack-ui/themed'

interface WrongCredentialsDialogProps {
    showAlertDialog: boolean
    setShowAlertDialog: Function
}

export function WrongCredentialsDialog ({ showAlertDialog, setShowAlertDialog } : WrongCredentialsDialogProps) {

    return (
      <Center display='none'>
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
          setShowAlertDialog(false);
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size='lg'>Ha ocurrido un error</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} size='lg' color='$darkBlue500' lineHeight='$lg' />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text size='sm'>
                Parece que las credenciales que ingresaste no son correctas. Por favor, intenta de nuevo.
                Si el problema persiste, por favor, contacta con soporte.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
             <ButtonGroup space="lg">
                <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
                >
                  <ButtonText>Aceptar</ButtonText>
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    );
}
