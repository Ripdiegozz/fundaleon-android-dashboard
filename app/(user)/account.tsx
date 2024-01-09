import React, { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { View } from 'react-native'
import Auth from '../(auth)/sign-up'
import Account from '../../components/account/account-view'

const AccountPage = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
        {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

export default AccountPage