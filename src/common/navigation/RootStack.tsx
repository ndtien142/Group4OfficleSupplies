// 🚀 import Component from package
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// 🚀 import Components from Pages
import TabBottom from './TabBottom';
import {
  SPLASH_LOADING,
  PROFILE,
  TAB_BOTTOM,
  HOME,
  STATISTICS,
  DETAIL_PRODUCT,
  LOGIN_SCREEN,
  OTP_SCREEN,
  REGISTER_SCREEN,
  MANAGER_EDIT_PRODUCT,
  MANAGER_LIST_PRODUCT,
  MANAGER_ADD_NEW_PRODUCT,
} from '../constants/route.constant'; // Assuming INTRO is also a route constant
import ProfileScreenContainer from '@group4officesupplies/profile/index';
import HomeScreenContainer from '@group4officesupplies/home';
import ProductListScreen from '@group4officesupplies/home/components/ProductListScreen';
import StatisticScreen from '@group4officesupplies/statistic';
import DetailProductScreen from '@group4officesupplies/detail-product';
import LoginContainerScreen from '@group4officesupplies/auth/login';
import SplashLoading from '@group4officesupplies/splash-loading';
import OTPContainerScreen from '@group4officesupplies/auth/otp-input';
import RegisterContainerScreen from '@group4officesupplies/auth/register';
import ManageListProductContainer from '@group4officesupplies/manager/list';
import ManagerAddNewProductContainer from '@group4officesupplies/manager/add-product';
import ManagerEditContainer from '@group4officesupplies/manager/edit-product/ManagerEditContainer';

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
  LoginScreen: {};
  OTPScreen: {};
  ProductList: {};
  DetailProduct: {};
  ExerciseThree: {};
  ExerciseFive: {};
  Statistic: {};
  AddProduct: {};
  RegisterScreen: {};
  ManagerEditProduct: {};
};

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
        name={SPLASH_LOADING}
        component={SplashLoading}
        options={{ headerShown: false }}
      />
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
        name={LOGIN_SCREEN}
        component={LoginContainerScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={REGISTER_SCREEN}
        component={RegisterContainerScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={OTP_SCREEN}
        component={OTPContainerScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
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
      <Stack.Screen
        name={MANAGER_LIST_PRODUCT}
        component={ManageListProductContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={MANAGER_ADD_NEW_PRODUCT}
        component={ManagerAddNewProductContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={MANAGER_EDIT_PRODUCT}
        component={ManagerEditContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
