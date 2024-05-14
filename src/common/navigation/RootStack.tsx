// 🚀 import Component from package
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

// 🚀 import Components from Pages
import TabBottom from './TabBottom';
import {
  SPLASH_LOADING,
  PROFILE,
  TAB_BOTTOM,
  HOME,
  EXERCISE_SEVEN,
  EXERCISE_SIX,
  EXERCISE_ONE,
  EXERCISE_NINE,
  LOGIN,
  EXERCISE_THREE,
  EXERCISE_FIVE,
  STATISTICS,
  DETAIL_PRODUCT,
  CART,
} from '../constants/route.constant'; // Assuming INTRO is also a route constant
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import ProfileScreenContainer from '@group4officesupplies/profile/index';
import HomeScreenContainer from '@group4officesupplies/home';
import ExerciseSevenScreen from '@group4officesupplies/exercise/bai7';
import ExerciseSixScreen from '@group4officesupplies/exercise/bai6';
import App from '@group4officesupplies/exercise/bai1/App';
import AppBai9 from '@group4officesupplies/exercise/bai9/AppBai9';
import ExerciseNineScreen from '@group4officesupplies/exercise/bai9';
import Login from '@group4officesupplies/home/components/Login';
import Register from '@group4officesupplies/home/components/Register';
import OTPScreen from '@group4officesupplies/home/components/OTPScreen';
import ProductListScreen from '@group4officesupplies/home/components/ProductListScreen';
import ExerciseThreeScreen from '@group4officesupplies/exercise/bai3';
import ExerciseFiveScreen from '@group4officesupplies/exercise/bai5';
import StatisticScreen from '@group4officesupplies/statistic';
import DetailProductScreen from '@group4officesupplies/detail-product';
import CartScreenContainer from '@group4officesupplies/cart';

// 🚀 import Constants from file Constants

export type RootStackParamList = {
  SplashLoading: {};
  Intro: { navigation: any };
  Auth: {}; // Define Auth route type
  Cart: {};
  Profile: {};
  TabBottom: {};
  Home: {};
  ExerciseSeven: {};
  ExerciseSix: {};
  ExerciseOne: {};
  ExerciseNine: {};
  Login: undefined;
  Register: undefined;
  OTPScreen: undefined;
  ProductList: {};
  DetailProduct: {};
  ExerciseThree: {};
  ExerciseFive: {};
  Statistic: {};
};

// export type InputOTPProps = NativeStackScreenProps<
//   RootStackParamList,
//   'InputOTP'
// >;

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  // const dispatch = useAppDispatch();
  // const hasRedirected = useAppSelector(state => state.homePage.hasRedirected);
  // const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn);
  // const navigation = useNavigation();
  // const timeFirstOpen = useAppSelector(
  //   state => state.ratingReducer.timeFirstOpen,
  // );

  // useEffect(() => {
  //   const handleUserInApp = () => {
  //     if (!hasRedirected && !isLoggedIn) {
  //       //   dispatch(setHasRedirectedAuth(true));
  //       navigation.navigate(AUTH as never);
  //     }
  //   };

  //   const timeoutId = setTimeout(handleUserInApp, 2 * 60 * 1000);

  //   return () => clearTimeout(timeoutId);
  // }, [hasRedirected, isLoggedIn, navigation]);

  // useEffect(() => {
  //   if (!timeFirstOpen) {
  //     // dispatch(setTimeFirstOpen(dayjs().toString()));
  //   }
  // }, [timeFirstOpen]);

  return (
    <Stack.Navigator
      initialRouteName={SPLASH_LOADING as never}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={TAB_BOTTOM}
        component={TabBottom}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={HOME}
        component={HomeScreenContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={PROFILE}
        component={ProfileScreenContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={CART}
        component={CartScreenContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_SEVEN}
        component={ExerciseSevenScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_SIX}
        component={ExerciseSixScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_ONE}
        component={App}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_NINE}
        component={AppBai9}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_FIVE}
        component={ExerciseFiveScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={EXERCISE_THREE}
        component={ExerciseThreeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={STATISTICS}
        component={StatisticScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={DETAIL_PRODUCT}
        component={DetailProductScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
