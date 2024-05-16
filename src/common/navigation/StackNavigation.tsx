import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreenContainer from '@group4officesupplies/profile';
import HomeScreenContainer from '@group4officesupplies/home';
import { HOME, LOGIN, CART, ORDER } from '../constants/route.constant';
import Login from '@group4officesupplies/home/components/Login';
import CartScreenContainer from '@group4officesupplies/cart';
import OrderScreenContainer from '@group4officesupplies/order';

// import HomeScreen from '../screen/HomeScreen';
// import DetailScreen from '../screen/DetailScreen';
// import ProductListScreen from '../screen/ProductListScreen';
// import CartScreen from '../screen/CartScreen';
// import OrderScreen from '../screen/OrderScreen';
// import ProfileScreen from '../screen/ProfileScreen';

const Stack = createStackNavigator();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}>
      <Stack.Screen name={HOME} component={HomeScreenContainer}></Stack.Screen>
    </Stack.Navigator>
  );
};

const CartStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="order-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}>
      <Stack.Screen name={CART} component={CartScreenContainer}></Stack.Screen>
    </Stack.Navigator>
  );
};

const OrderStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="order-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name={ORDER}
        component={OrderScreenContainer}></Stack.Screen>
    </Stack.Navigator>
  );
};

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name="profile-screen"
        component={ProfileScreenContainer}></Stack.Screen>
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  CartStackNavigator,
  OrderStackNavigator,
  ProfileStackNavigator,
};
