import { GluestackUIProvider } from "@gluestack-ui/themed"
import { Stack } from 'expo-router';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
import { AuthProvider } from '../context/authStore';

export default function Layout() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
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
      </GluestackUIProvider>
    </AuthProvider>
  )
}