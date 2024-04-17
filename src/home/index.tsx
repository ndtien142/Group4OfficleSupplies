import { ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from './components/Banner';
import { IBannerItem } from './interface';
import {
  bannerSection,
  mockProductSection,
  servicesSection,
} from './mock_data';
import HomeHeader from './components/HomeHeader';
import Service from './components/Service';
import HorizontalProduct from './components/HorizontalProduct';

const HomeScreenContainer = () => {
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bgColor={'#FFF'}
        height={'100%'}>
        <VStack space={'20px'} pb={'50px'}>
          <VStack bgColor={'white'}>
            <HomeHeader />
          </VStack>
          <Banner bannerData={bannerSection} />
          <Service data={servicesSection} />
          <HorizontalProduct dataSection={mockProductSection} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreenContainer;
