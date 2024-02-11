import { useState, useEffect } from 'react'
import { makeRequest } from '../lib/axios'
import { useAuth } from '../context/authStore'

export const useFindUser = () => {
    const { session } = useAuth()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        id: '',
        createdAt: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        role: '',
        cedula: ''
    })

    useEffect(() => {
        if (session) {
            console.log("Entering into if session", session?.user?.id)
            getUser()
        }
    }, [session])

    async function getUser() {
        if (session?.user?.id) {
            try {
                setLoading(true)
                const { data } = await makeRequest.get(`/user/get/${session?.user?.id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        // cors
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': session?.user?.id
                    },
                })
    
                setUser(data.data)
            } catch (error) {
                // Check error type
                console.error('Error getting user. Check console.')
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    return { loading, user }
}
