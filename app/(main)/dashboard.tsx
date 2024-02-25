import React, { useEffect, useState } from 'react';
import { Box, Text, ScrollView } from '@gluestack-ui/themed';
import { DashboardHeader } from '../../components/dashboard/header';
import { DashboardBody } from '../../components/dashboard/body';
import { useFindUser } from '../../hooks/use-find-user';
import { router } from 'expo-router';

const Dashboard = () => {
  const { user, loading } = useFindUser();
  const [userNow, setUserNow] = useState(false)

  useEffect(() => {
    if (!user) {
      setUserNow(true)
    }
  }, [user])

  useEffect(() => {
    if (userNow) {
      router.push('/set-up')
    }
  }, [userNow])

  return (
      <ScrollView marginTop="$12">
          <DashboardHeader title="Dashboard" />
          {/* <ActionSheet /> */}
          {
            loading ? (
              <Box>
                <Text fontSize="$xl"  paddingLeft="$4" paddingTop="$6" fontWeight='$medium'>Cargando...</Text>
              </Box>
            ) : (
              <Box>
                <Text 
                  fontSize="$2xl" 
                  paddingTop="$6" 
                  paddingLeft="$4"
                  fontWeight='$medium'
                >
                  Bienvenido/a, {user?.fullName.split(' ')[0]}
                </Text>
                <Text fontSize="$md" paddingLeft="$4" fontWeight='$regular'>¿Qué deseas hacer hoy?</Text>
              </Box>
            )
          }
          <DashboardBody />
      </ScrollView>
  );
};

export default Dashboard;
