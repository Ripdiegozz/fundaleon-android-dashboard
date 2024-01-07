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

export function WrongSetupDialog ({ showAlertDialog, setShowAlertDialog } : WrongCredentialsDialogProps) {

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
                Parece que los datos que ingresaste no coinciden con el formato esperado. Por favor, intenta de nuevo.
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
