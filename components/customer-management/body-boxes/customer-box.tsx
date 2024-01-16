import React, { useEffect, useState } from 'react'
import { ProgressChart } from 'react-native-chart-kit'
import { Text, Box, Icon, Badge, BadgeText } from '@gluestack-ui/themed'
import { ChevronUpIcon } from 'lucide-react-native'
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
  }, [])

  return (
    <Box width='$full' paddingBottom='$4' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4' borderRadius='$lg'>
        <Box display='flex' width='$full' flexDirection='row' justifyContent='center' alignItems='center'>
          <Text fontSize='$3xl' paddingTop='$4' paddingLeft='$2' paddingRight='$4' fontWeight='$regular' textAlign='center'>{customers}</Text>
          <Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$lg' fontWeight='$medium'>Clientes registrados</Text>
              {/* <Badge size="md" variant="solid" borderRadius="$none" action="success" marginLeft="$2">
                <BadgeText fontSize='$md' fontWeight='$regular'>
                  <Icon as={ChevronUpIcon} size='md' color='$green' marginLeft='$2' />
                  TODO
                </BadgeText>
              </Badge> */}
            </Box>
          </Box>
        </Box>
    </Box>
  )
}
