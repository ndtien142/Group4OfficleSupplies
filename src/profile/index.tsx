import { ImagePath } from '@group4officesupplies/common/constants/imagePath';
import { Box, Heading, ScrollView, Stack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabBottom from './components/ProfileTabBottom';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LOGIN_SCREEN } from '@group4officesupplies/common/constants/route.constant';
import auth from '@react-native-firebase/auth';
import { useGetProfile } from './hooks/useGetProfile';
import {
  getFromAsyncStorage,
  removeFromAsyncStorage,
} from '@group4officesupplies/common/utils/utils.common';
import { LocalStorageKey } from '@group4officesupplies/common/constants/common.constants';
import { useAppDispatch } from '@group4officesupplies/common/hooks/useAppDispatch';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';
import { setUserId } from '@group4officesupplies/common/redux/rootConfigSlice';
import { getProfileUser } from './profile.service';

const ProfileContainerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(state => state.rootConfigSliceReducer);
  console.log('user id in profile', userId);

  const { data: userProfile } = useGetProfile(userId);

  useFocusEffect(
    React.useCallback(() => {
      if (userId?.length <= 0) {
        navigation.reset({
          index: 0,
          routes: [{ name: LOGIN_SCREEN }],
        });
      }
    }, []),
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      removeFromAsyncStorage(LocalStorageKey.USER_ID);
      dispatch(setUserId(''));
      navigation.reset({
        index: 0,
        routes: [{ name: LOGIN_SCREEN }],
      });
    } catch (err) {
      console.log('Logout errors::::', err);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView height={'100%'} bgColor={'#f8f8f8'}>
        <ProfileHeader
          name={userProfile?.name || ''}
          phoneNumber={userProfile?.phoneNumber || ''}
        />
        <Stack padding={'16px'} space={'12px'} mb={50}>
          <Box
            borderRadius={'24px'}
            overflow={'hidden'}
            px={'24px'}
            pb={'10px'}
            pt={'10px'}
            bgColor={'#FFF'}>
            <Heading
              fontSize={'18px'}
              fontWeight={'600'}
              mt={'16px'}
              fontFamily={'Averta-Semibold'}>
              Giỏ hàng
            </Heading>
            <ProfileTabBottom
              onPress={() => {}}
              isLastChild
              sourceImage={ImagePath.shoppingBag}
              title="Đơn hàng của tôi"
            />
            <ProfileTabBottom
              onPress={() => {}}
              isLastChild
              sourceImage={ImagePath.truck}
              title="Lịch sử đặt hàng"
            />
          </Box>
          <Box
            borderRadius={'24px'}
            overflow={'hidden'}
            px={'24px'}
            pb={'10px'}
            pt={'10px'}
            bgColor={'#FFF'}>
            <Heading
              fontSize={'18px'}
              fontWeight={'600'}
              mt={'16px'}
              fontFamily={'Averta-Semibold'}>
              Cài đặt
            </Heading>
            <ProfileTabBottom
              onPress={handleLogout}
              isLastChild
              sourceImage={ImagePath.logout}
              title="Đăng xuất"
            />
          </Box>
          <Box mb={'50px'} />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileContainerScreen;
