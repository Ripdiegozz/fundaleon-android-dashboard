import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { BookBox } from './body-boxes/book-box'
import { StatisticBox } from './body-boxes/statistic-box'
import { DashboardFooter } from './footer'

export const DashboardBody = () => {
  return (
    <Box paddingHorizontal='$0' paddingTop='$6'>
        <Box height="$full" display='flex' flexDirection='row' flexWrap='wrap' gap='$2' justifyContent='center' marginBottom='$0'>
            <BookBox />
            <StatisticBox />
            <DashboardFooter />
        </Box>
    </Box>
  )
}
