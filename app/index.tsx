import { useEffect } from 'react'
import Auth from './(auth)/sign-up'
import { useAuth } from '../context/authStore'
import 'react-native-url-polyfill/auto'

export default function App() {
  const { session, logout } = useAuth()

  useEffect(() => {
    // logout if session is persisted
    if (session) logout()
  }, [])

  return (
    <>
      <Auth />
    </>
  )
}
