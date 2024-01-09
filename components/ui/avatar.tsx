import React, { useState } from 'react'
import { 
    Avatar, 
    VStack, 
    HStack, 
    Icon,
    Button,
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
} from "@gluestack-ui/themed"
import { User } from "lucide-react-native";
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router'

export const AvatarComponent = () => {
    const [showActionsheet, setShowActionsheet] = useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    const onLogout = () => {
        supabase.auth.signOut()
        router.replace('/')
    }

    return (           
        <>
            <VStack space="2xl">
              <HStack space="md">
                <Button onPress={handleClose} bgColor="$backgroundLight100">
                    <Avatar size="md" bgColor="$white" borderColor="$rose100" borderWidth={2}>
                      {/* User is imported from 'lucide-react-native' */}
                      <Icon as={User} color="$indigo600" size="xl"/>
                    </Avatar>
                </Button>
              </HStack>
            </VStack>

            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
            <ActionsheetBackdrop />
            <ActionsheetContent zIndex={999}>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Configurar Perfil</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Ayuda y soporte</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Acerca de</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={() => {
                handleClose()
                onLogout()    
              }}>
                <ActionsheetItemText>Cerrar Sesión</ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
            </Actionsheet>
        </>
    )
}