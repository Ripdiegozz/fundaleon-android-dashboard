import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../../lib/axios'
import { Text, Box, Icon } from '@gluestack-ui/themed'
import { ChevronDownIcon } from 'lucide-react-native'

export const LoanBox = () => {
  const [books, setBooks] = useState(0)

  useEffect(() => {
    //TODO: Change for a react query hook tomorrow
    const getBooks = async () => {
      const { data } = await makeRequest.get('/book/get/all')
      // count the object keys
      const count = Object.keys(data.data).length
      setBooks(count)
    }

    getBooks()
  }, [])

  return (
    <Box width='$48' height='$1/5' paddingBottom='$2' bgColor='$secondary50' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4'>
        <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
          <Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$md' fontWeight='$medium'>Préstamos iniciados</Text>
              <Icon as={ChevronDownIcon} size='md' color='$red' marginLeft='$2' />
            </Box>
            <Text fontSize='$sm' fontWeight='$regular'>Este mes.</Text>
          </Box>
        </Box>
        
        <Box width='$full' height='$full' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
          <Text fontSize='$6xl' paddingTop='$16' fontWeight='$regular' textAlign='center'>{books}</Text>
        </Box>
    </Box>
  )
}
