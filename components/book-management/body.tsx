import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { BookBox } from './body-boxes/book-box'
import { BooksTable } from './body-boxes/book-table'
import { DashboardFooter } from './footer'
import { LinksBox } from './body-boxes/links-box'

export const DashboardBody = () => {
  return (
    <Box paddingTop='$6' paddingBottom='$6'>
        <Box height="$full" display='flex' flexDirection='row' flexWrap='wrap' gap='$2' justifyContent='center'>
            <BookBox />
            <LinksBox />
            <BooksTable />
            <DashboardFooter />
        </Box>
    </Box>
  )
}
