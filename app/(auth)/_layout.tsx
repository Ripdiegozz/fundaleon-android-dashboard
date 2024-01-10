import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
          <Stack>
            <Stack.Screen
              name="set-up"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="sign-up"
               options={{
                headerShown: false,
              }}
            />
          </Stack>
    </>
  )
}