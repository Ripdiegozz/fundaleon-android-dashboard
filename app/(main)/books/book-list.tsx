import { Box, Text, ScrollView } from '@gluestack-ui/themed'
import React from 'react'
import { DashboardHeader } from '../../../components/book-management/header'
import { DashboardBody } from '../../../components/book-management/body'

export default function BookDashboard() {
  return (
    <ScrollView paddingTop="$5">
      <DashboardHeader title="Inventario" />
      <DashboardBody />
    </ScrollView>
  )
}