import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreenContainer from '@group4officesupplies/profile';
import HomeScreenContainer from '@group4officesupplies/home';
import OrderScreenContainer from '@group4officesupplies/order';
import { HOME, LOGIN, CART, LOGIN_SCREEN } from '../constants/route.constant';
import Login from '@group4officesupplies/home/components/Login';
import CartScreenContainer from '@group4officesupplies/cart';
import { LocalStorageKey } from '../constants/common.constants';
import { getFromAsyncStorage } from '../utils/utils.common';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  useEffect(() => {
    const getUserId = async () => {
      const userId = await getFromAsyncStorage(LocalStorageKey.USER_ID);
      if (!userId) {
        navigation.reset({
          index: 0,
          routes: [{ name: LOGIN_SCREEN }],
        });
      }
    };
    getUserId();
  }, []);
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
