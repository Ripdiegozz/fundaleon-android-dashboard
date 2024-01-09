import React from 'react';
import { router } from 'expo-router';
import { Box, Text, ScrollView } from '@gluestack-ui/themed';
import { DashboardHeader } from '../../components/dashboard/header';
import { DashboardBody } from '../../components/dashboard/body';
import { useFindUser } from '../../hooks/use-find-user';

const Dashboard = () => {
  const { user, loading } = useFindUser();
  
  return (
      <ScrollView marginTop="$12">
          <DashboardHeader />
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
