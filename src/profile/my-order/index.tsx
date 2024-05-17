import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyOrderHeader from './components/MyOrderHeader';
import { ScrollView, Stack } from 'native-base';
import MyOrderItem from './components/MyOrderItem';

const MyOrderContainer = () => {
  return (
    <SafeAreaView>
      <MyOrderHeader />
      <ScrollView>
        <Stack space={'12px'} padding={'16px'}>
          <MyOrderItem />
          <MyOrderItem />
          <MyOrderItem />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrderContainer;
