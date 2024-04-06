import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import component from package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import component from pages
import { Center, Image, Text } from 'native-base';
import { useAppSelector } from '../hooks/useAppSelector';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  CartStackNavigator,
  MainStackNavigator,
  OrderStackNavigator,
  ProfileStackNavigator,
} from './StackNavigation';
import { CART, HOME, ORDER, PROFILE } from '../constants/route.constant';

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
        name={HOME}
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcon name="home" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={CART}
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcon name="shopping-cart" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={ORDER}
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcon name="list-alt" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={PROFILE}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcon name="account-circle" size={size} color={color} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBottom;
