import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
          <Stack>
            <Stack.Screen
              name="account"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
    </>
  )
}