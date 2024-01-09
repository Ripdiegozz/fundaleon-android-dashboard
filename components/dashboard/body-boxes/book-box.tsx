import React, { useEffect, useState } from 'react'
import { ProgressChart } from 'react-native-chart-kit'
import { Text, Box, Icon, Badge, BadgeText } from '@gluestack-ui/themed'
import { ChevronUpIcon } from 'lucide-react-native'
import { makeRequest } from '../../../lib/axios'

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

export const BookBox = () => {
  const [customer, setCustomer] = useState(0)
  const [chartData, setChartData] = useState({
    labels: ["Swim"], // optional
    data: [0.8]
  })

  useEffect(() => {
    //TODO: Change for a react query hook tomorrow
    const getCustomer = async () => {
      const { data } = await makeRequest.get('/customer/get/count/month')
      // count the actual month
      let month : any = new Date().getMonth() + 1 // 1 - 12
      // get the actual month customer count
      if (month < 10) {
        month = `0${month}`
      }
      // get the actual month customer count
      const monthCustomer = data.data.count[month]
      // set the Customer count
      if (monthCustomer) {
        setCustomer(monthCustomer)
      } else {
        setCustomer(0)
      }
      // set scale for the chart
      let scale
      if (monthCustomer) {
        scale = monthCustomer / 100
      } else {
        scale = 0
      }
      // set the chart data
      const chartData = {
        labels: ["Clientes"], // optional
        data: [scale]
      }
      // set the chart data state
      setChartData(chartData)
    }

    getCustomer()
  }, [])

  return (
    <Box width='$full' paddingBottom='$2' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='flex-start' padding='$4' borderRadius='$lg'>
        <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
          <Text fontSize='$4xl' paddingTop='$6' paddingLeft='$2' fontWeight='$regular' textAlign='center'>{customer}</Text>
        </Box>
        <Box display='flex' width='$full' flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$lg' fontWeight='$medium'>Clientes registrados</Text>
              <Icon as={ChevronUpIcon} size='md' color='$green' marginLeft='$2' />
            </Box>
            <Box display='flex' flexDirection='row' rowGap='$1' alignItems='center'>
              <Text fontSize='$md' fontWeight='$regular'>Este mes.</Text>
              <Badge size="md" variant="solid" borderRadius="$none" action="success" marginLeft="$2">
                <BadgeText fontSize='$md' fontWeight='$regular'>+ %100</BadgeText>
              </Badge>
            </Box>
          </Box>
          <ProgressChart
            data={chartData}
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
