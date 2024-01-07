import { Text, Box } from '@gluestack-ui/themed'
import { BookBox } from './body-boxes/book-box'
import { LoanBox } from './body-boxes/loan-box'
import React from 'react'

export const DashboardBody = () => {
  return (
    <Box paddingHorizontal='$0' paddingTop='$12'>
        <Box height="$full" display='flex' flexDirection='row' flexWrap='wrap' gap='$2' justifyContent='center'>
            <BookBox />
            <LoanBox />
            <Box width='$full' height='$1/4' paddingBottom='$2' bgColor='$amber300'>
                <Text fontSize='$md' fontWeight='$medium' textAlign='center'>Tareas</Text>
            </Box>
        </Box>
    </Box>
  )
}
