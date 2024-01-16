import { Box, Text, ScrollView } from '@gluestack-ui/themed'
import React from 'react'
import { DashboardHeader } from '../../../components/customer-management/header'
import { DashboardBody } from '../../../components/customer-management/body'

export default function CustomerDashboard() {
  return (
    <ScrollView paddingTop="$5">
      <DashboardHeader title="Clientes" />
      <DashboardBody />
    </ScrollView>
  )
}