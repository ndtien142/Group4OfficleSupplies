import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import component from package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import component from pages
import { Center, Flex, Image, Text, View } from 'native-base';
import { useAppSelector } from '../hooks/useAppSelector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CartStackNavigator,
  MainStackNavigator,
  OrderStackNavigator,
  ProfileStackNavigator,
} from './StackNavigation';
import {
  BOTTOM_TAB_CART,
  BOTTOM_TAB_EXERCISE,
  BOTTOM_TAB_HOME,
  BOTTOM_TAB_ORDER,
  BOTTOM_TAB_PROFILE,
} from '../constants/route.constant';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ExerciseContainer from '@group4officesupplies/exercise';

const Tab = createBottomTabNavigator();

const TabBottom = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // headerStyle: {
        //   height: 56,
        //   fontSize: '24px',
        // },
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          fontSize: '24px',
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
        },
        tabBarInactiveTintColor: '#999999',
        tabBarActiveTintColor: '#0E3C9E',
        sceneContainerStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '400',
        },
      })}>
      <Tab.Screen
        name={BOTTOM_TAB_HOME}
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate(BOTTOM_TAB_HOME as never)}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <MaterialCommunityIcons name="home" size={size} color={color} />
                <Text
                  textAlign={'center'}
                  minWidth={'50px'}
                  color={color}
                  size={size}>
                  {t('home')}
                </Text>
              </Flex>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_CART}
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate(BOTTOM_TAB_CART as never)}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <MaterialCommunityIcons name="cart" size={size} color={color} />
                <Text
                  textAlign={'center'}
                  minWidth={'50px'}
                  color={color}
                  size={size}>
                  {t('cart')}
                </Text>
              </Flex>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_ORDER}
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate(BOTTOM_TAB_ORDER as never)}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <MaterialCommunityIcons
                  name="shopping"
                  size={size}
                  color={color}
                />
                <Text
                  textAlign={'center'}
                  minWidth={'50px'}
                  color={color}
                  size={size}>
                  {t('order')}
                </Text>
              </Flex>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_PROFILE}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate(BOTTOM_TAB_PROFILE as never)}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <AntDesign name="user" size={size} color={color} />
                <Text
                  textAlign={'center'}
                  minWidth={'50px'}
                  color={color}
                  size={size}>
                  {t('profile')}
                </Text>
              </Flex>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_EXERCISE}
        component={ExerciseContainer}
        options={{
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate(BOTTOM_TAB_EXERCISE as never)}>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <AntDesign name="user" size={size} color={color} />
                <Text
                  textAlign={'center'}
                  minWidth={'50px'}
                  color={color}
                  size={size}>
                  {t('exercise')}
                </Text>
              </Flex>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBottom;
