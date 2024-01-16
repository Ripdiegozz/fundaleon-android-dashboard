import React from 'react'
import { Box } from '@gluestack-ui/themed'
import { CustomerBox } from './body-boxes/customer-box'
import { CustomersTable } from './body-boxes/customers-table'
import { DashboardFooter } from './footer'
import { LinksBox } from './body-boxes/links-box'

export const DashboardBody = () => {
  return (
    <Box paddingTop='$6' paddingBottom='$6'>
        <Box height="$full" display='flex' flexDirection='row' flexWrap='wrap' gap='$2' justifyContent='center'>
            <CustomerBox />
            <LinksBox />
            <CustomersTable />
            <DashboardFooter />
        </Box>
    </Box>
  )
}
