import { GluestackUIProvider } from "@gluestack-ui/themed"
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
import { AuthProvider } from '../context/authStore';
import { ModalProvider } from "../components/providers/modal-provider";

export default function Layout() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <PaperProvider>
          <Stack>
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
               options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(user)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <ModalProvider />
        </PaperProvider>
      </GluestackUIProvider>
    </AuthProvider>
  )
}