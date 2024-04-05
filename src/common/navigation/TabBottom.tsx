import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// import component from package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import component from pages
import VideoRoute from './VideoNavigator';
import HomeRoute from './HomeNavigator';
import { PodcastRoutes } from './Podcast';
import AccountRoute from './AccountNavigator';
import { imageIconTab } from '../constants/imagePath';
import { Center, Image, Text } from 'native-base';
// import { GameListScreen } from '@clvtube/game/game-list-screen/components/index';
import {
  ACCOUNT_ROUTE,
  BOTTOM_TAB_HOME_PAGE,
  BOTTOM_TAB_PODCAST_LIST,
  BOTTOM_TAB_VIDEO_LIST,
} from '../constants/route.constants';
import { useAppSelector } from '../hooks/useAppSelector';
import ModalWarningLogin from '../components/modal/ModalWarningLogin';

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: BOTTOM_TAB_HOME_PAGE,
    label: 'Home',
    component: HomeRoute,
    iconActive: imageIconTab.HOME_ACTIVE,
    iconInActive: imageIconTab.HOME,
  },
  {
    route: BOTTOM_TAB_VIDEO_LIST,
    label: 'Video',
    component: VideoRoute,
    iconActive: imageIconTab.VIDEO_ACTIVE,
    iconInActive: imageIconTab.VIDEO,
  },
  {
    route: BOTTOM_TAB_PODCAST_LIST,
    label: 'Podcast',
    component: PodcastRoutes,
    iconActive: imageIconTab.PODCAST_ACTIVE,
    iconInActive: imageIconTab.PODCAST,
  },
  {
    route: ACCOUNT_ROUTE.INDEX,
    label: 'Tài khoản',
    component: AccountRoute,
    iconActive: imageIconTab.ACCOUNT_ACTIVE,
    iconInActive: imageIconTab.ACCOUNT,
  },
];

const TabItem = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const [showModalWarningLogin, setShowModalWarningLogin] = useState(false);
  const focused = accessibilityState.selected;

  // Sử dụng `useSelector` để lấy giá trị `isLoggedIn` từ Redux store
  const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn);

  const handleAccountTabPress = () => {
    setShowModalWarningLogin(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={
          !isLoggedIn && item?.route === ACCOUNT_ROUTE.INDEX
            ? handleAccountTabPress
            : onPress
        }
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Center
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            height={'22px'}
            width={'22px'}
            alt={'image'}
            source={focused ? item?.iconActive : item?.iconInActive}
            key={focused ? item?.iconActive : item?.iconInActive}
          />
          <Text color={focused ? '#0E3C9E' : '#000'}>{item?.label}</Text>
        </Center>
      </TouchableOpacity>
      {showModalWarningLogin && (
        <ModalWarningLogin
          showModalUnlock={showModalWarningLogin}
          setShowModalUnlock={() => setShowModalWarningLogin(false)}
          message={
            'Bạn cần đăng nhập để có thể truy cập vào tài khoản của mình!'
          }
        />
      )}
    </>
  );
};

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
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              title: item?.label,
              tabBarButton: (props: any) => <TabItem {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabBottom;
