import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartSkeleton from './components/CartSkeleton';
import { useGetCart } from './hooks/useGetCart';
// import { useGetCart } from './hooks/';

// import { useGetDetailProduct } from './hooks/useGetDetailProduct';
// import DetailProductSkeleton from './components/DetailProductSkeleton';

interface Item {
  id: string;
  title: string;
  brand: string;
  qty: number;
  image: string;
  price: number;
}

const CartScreenContainer = () => {
  //   const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
  //     useContext(AuthContext);

  //   const handleLogout = async () => {
  //     const res = await logout();
  //     if (res.success === true) {
  //       ToastAndroid.show('Logged Out Successfully', ToastAndroid.BOTTOM);
  //       setIsLoggedIn(false);
  //       setCurrentUser(null);
  //     }
  //   };

  const router = useRoute();
  const widthScreen = Dimensions.get('screen').width;
  const [qty, setQty] = useState(1);

  // @ts-ignore
  const id = router?.params?.userID
    ? 'LsjNM7U2G0OWLGaKtTuziX6MCls1'
    : 'LsjNM7U2G0OWLGaKtTuziX6MCls1';
  const navigation = useNavigation();
  const { data: cart, isLoading } = useGetCart(id as string);

  return (
    <SafeAreaView>
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <View key={index}>
            <Text color={'#000'}>
              Product ID: {item.productID}, Quantity: {item.quantity}
            </Text>
          </View>
        ))
      ) : (
        <Text>No items in cart.</Text>
      )}
      {/* Header */}
      <Text color={'#000'}> he he{id}</Text>
      <Stack
        height={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Box
          width={widthScreen}
          backgroundColor={'white'}
          position={'absolute'}
          flexDirection={'row'}
          alignItems={'center'}>
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" color={'#000'} size={26} />
          </TouchableOpacity>
          <Text color={'#000'} fontWeight={600} fontSize={'20px'}>
            Giỏ hàng
          </Text>
        </Box>
        {/* End Header */}

        {/* Content */}
        <ScrollView style={{ marginTop: -50, marginBottom: 50 }} zIndex={-10}>
          <Stack padding={'100px'} space={'10px'}>
            {[1, 2, 3, 4, 5, 6].map(index => (
              <Stack margin={'20px'}>
                <Box
                  key={index}
                  flexDirection="row"
                  alignItems="center"
                  marginLeft={'-100px'}>
                  <Checkbox isChecked={false} value={''} margin={'10px'} />
                  <Image
                    source={{
                      uri: 'https://bizweb.dktcdn.net/thumb/grande/100/426/039/products/8c9b9e2bff5ba163d1755ae09597c3.jpg?v=1657127733457',
                    }}
                    width={'80px'}
                    height={'80px'}
                    marginLeft={'20px'}
                    alt={'image product'}
                  />
                  <Box
                    borderRadius={'12px'}
                    width={'100px'}
                    height={'80px'}
                    marginLeft={'20px'}
                    justifyContent={'space-between'}>
                    <HStack>
                      <Text color={'#000'}>Tên sản phẩm</Text>
                    </HStack>
                    <HStack>
                      <Text color={'#000'}>Số lượng:</Text>
                    </HStack>
                  </Box>
                </Box>
                {/* Separator */}
                <Box
                  width={'100%'}
                  borderWidth={'1px'}
                  borderColor={'#eaeaea'}
                  borderStyle={'dashed'}
                />
              </Stack>
            ))}
          </Stack>
        </ScrollView>
        {/* End Content */}

        {/* Footer */}
        <Box
          width={widthScreen}
          backgroundColor={'white'}
          position={'absolute'}
          bottom={0}
          height={150}
          flexDirection={'column'}
          justifyContent={'space-between'}
          paddingRight={16}
          paddingBottom={16}>
          <HStack>
            <Text color={'#000'}>Nhap voucher:</Text>
          </HStack>
          <HStack
            width={widthScreen}
            alignItems="center"
            justifyContent="Center">
            <Checkbox isChecked={false} value={''} margin={'10px'} />
            <Text color={'#000'}>Tất cả</Text>
            <Text
              color={'#000'}
              fontWeight="bold"
              marginLeft={'60px'}
              marginRight={'10px'}>
              Tổng tiền: $100
            </Text>
            <Button
              // marginLeft={'90px'}
              // marginTop={'30px'}
              bgColor={'#E82629'}
              _pressed={{
                bgColor: 'rgba(232, 38, 41, 0.5)',
              }}
              height={'50px'}
              width={'140px'}
              borderRadius={'12px'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text
                color={'#FFF'}
                fontWeight={600}
                fontSize={'18px'}
                lineHeight={'20px'}>
                Thanh toán
              </Text>
            </Button>
          </HStack>
        </Box>

        {/* End Footer */}
      </Stack>
    </SafeAreaView>
  );
};

export default CartScreenContainer;
