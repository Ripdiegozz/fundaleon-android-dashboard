import React, { useEffect, useState } from 'react'
import { ProgressChart } from 'react-native-chart-kit'
import { Text, Box, Icon, Badge, BadgeText } from '@gluestack-ui/themed'
import { ChevronUpIcon } from 'lucide-react-native'
// import { makeRequest } from '../../../lib/axios'

const data = {
  labels: ["Swim"], // optional
  data: [0.8]
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(60, 80, 224, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export const LoanBox = () => {
  return (
    <Box width='$full' paddingBottom='$2' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4' borderRadius='$lg'>
        <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
          <Text fontSize='$4xl' paddingTop='$6' fontWeight='$regular' textAlign='center'>120</Text>
        </Box>
        <Box display='flex' width='$full' flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$lg' fontWeight='$medium'>Préstamos iniciados</Text>
              <Icon as={ChevronUpIcon} size='md' color='$green' marginLeft='$2' />
            </Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$md' fontWeight='$regular'>Este mes.</Text>
              <Badge size="md" variant="solid" borderRadius="$none" action="success" marginLeft="$2">
                <BadgeText fontSize='$md' fontWeight='$regular'>+ %15</BadgeText>
              </Badge>
            </Box>
          </Box>
          <ProgressChart
            data={data}
            width={200}
            height={140}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={true}
          />
        </Box>
    </Box>
  )
}
