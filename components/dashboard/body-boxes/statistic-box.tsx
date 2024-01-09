import React, { useState, useEffect } from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit';
import { makeRequest } from '../../../lib/axios'

const screenWidth = Dimensions.get("window").width;

export const StatisticBox = () => {
  const [chartData, setChartData] = useState({
    labels: ["", "", "", "", ""],
    datasets: [
      {
        data: [0, 0 ,0 ,0 ,0],
        color: (opacity = 1) => `rgba(60, 80, 224, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Clientes"]
  }) // optional
 
  useEffect(() => {
    const getCustomerCount = async () =>  {
      const { data } = await makeRequest.get('/customer/get/count/month')

      let customerCount: number[] = Object.values(data.data.count)
      // Order the array customerCount as the same as data.data.count
      customerCount = customerCount.sort((a, b) => a - b)
      // Check if the array is empty
      if (!customerCount) {
        return
      }
      // Get the labels from the object
      const labelsArray: string[] = Object.values(data.data.monthLabels)
      // Show only the last 5 months counting from the current month
      const currentMonth = new Date().getMonth()
      // Check if labelsArray has more than 5 months
      if (labelsArray.length > 5) {
        labelsArray.splice(0, labelsArray.length - 5)
      }
      // Check if customerCount has more than 5 months
      if (customerCount.length > 5) {
        customerCount.splice(0, customerCount.length - 5)
      }
      // Check if the current month is the first month of the array
      if (currentMonth === 0) {
        return
      }
      // Remove the first months of the array
      labelsArray.splice(0, currentMonth)
      customerCount.splice(0, currentMonth)
      // Set the chart data
      const chartData = {
        labels: labelsArray,
        datasets: [
          {
            data: customerCount,
            color: (opacity = 1) => `rgba(60, 80, 224, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Clientes"]
      }

      setChartData(chartData)
    }

    getCustomerCount()
  }, [])

  return (
    <Box width='$full' marginTop='$1' bgColor='$white' display='flex' justifyContent='flex-start' alignItems='center' padding='$4' paddingBottom="$0" paddingLeft="$0">
        <Text fontSize='$md' fontWeight='$medium' textAlign='center' padding='$2'>Clientes registrados por meses</Text>
        <BarChart
            data={chartData}
            width={screenWidth} // from react-native
            height={240}
            fromZero={true}
            showValuesOnTopOfBars={true}
            yAxisLabel={""}
            yAxisSuffix={""}
            chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "4",
                    strokeWidth: "1",
                    stroke: "rgba(60, 80, 224, 1)"
                }
            }}
            style={{
                marginVertical: 8,
                paddingBottom: 10,
                borderRadius: 16
            }}
        />
    </Box>
  )
}
