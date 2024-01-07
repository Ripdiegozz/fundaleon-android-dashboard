import React from 'react';
import { DashboardHeader } from '../../../components/dashboard/header';
import { DashboardBody } from '../../../components/dashboard/body';
import { useFindUser } from '../../../hooks/use-find-user';
import { Box, Text } from '@gluestack-ui/themed';

const Dashboard = () => {
  const { user, loading } = useFindUser();
  
  return (
      <Box>
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
      </Box>
  );
};

export default Dashboard;
