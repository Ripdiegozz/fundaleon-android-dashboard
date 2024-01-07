import { GluestackUIProvider } from "@gluestack-ui/themed"
import { AuthProvider } from '../context/authStore';
import { Stack } from 'expo-router';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme

export default function Layout() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <Stack />
      </GluestackUIProvider>
    </AuthProvider>
  )

}