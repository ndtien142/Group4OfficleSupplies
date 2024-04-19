import Header from '@group4officesupplies/exercise/common/components/Header';
import { Box, Stack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthlySales from './components/MonthlySales';
import MostSalesPieChart from './components/MostSalesPieChart';

const StatisticScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Thống kê" />
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        space={'16px'}
        px={'16px'}
        mt={'16px'}>
        <MonthlySales />
        <Box width={'100%'} bgColor={'#000'} height={'1px'} />
        <MostSalesPieChart />
      </Stack>
    </SafeAreaView>
  );
};

export default StatisticScreen;
