import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import component from package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import component from pages
import { Center, Image, Text } from 'native-base';
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
  BOTTOM_TAB_HOME,
  BOTTOM_TAB_ORDER,
  BOTTOM_TAB_PROFILE,
} from '../constants/route.constant';

const Tab = createBottomTabNavigator();

const TabBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          height: 56,
          fontSize: '24px',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          fontSize: '24px',
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
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_CART}
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="cart" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_ORDER}
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="shopping" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={BOTTOM_TAB_PROFILE}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBottom;
