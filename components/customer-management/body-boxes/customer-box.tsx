import React, { useEffect, useState } from 'react'
import { Text, Box } from '@gluestack-ui/themed'
import { makeRequest } from '../../../lib/axios'

export const CustomerBox = () => {
  const [customers, setCustomers] = useState(0)

  useEffect(() => {
    //TODO: Change for a react query hook tomorrow
    const getCustomersCount = async () => {
      const { data } = await makeRequest.get('/customer/get/all/count')
      setCustomers(data.data)
    }

    getCustomersCount()
  }, [customers])

  return (
    <Box width='$full' paddingBottom='$4' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4' borderRadius='$lg'>
        <Box display='flex' width='$full' flexDirection='row' justifyContent='center' alignItems='center'>
          <Text fontSize='$3xl' paddingTop='$4' paddingLeft='$2' paddingRight='$4' fontWeight='$regular' textAlign='center'>{customers}</Text>
          <Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$lg' fontWeight='$medium'>Clientes registrados</Text>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}
