import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetDetailProduct } from './hooks/useGetDetailProduct';
import DetailProductSkeleton from './components/DetailProductSkeleton';
import { db, auth, firestore } from 'firebase';
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { USER_COLLECTION } from '@group4officesupplies/common/constants/collection.constants';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@group4officesupplies/common/constants/querykeys.constants';
import { BOTTOM_TAB_CART } from '@group4officesupplies/common/constants/route.constant';
const DetailProductScreen = () => {
  const queryClient = useQueryClient();
  const router = useRoute();
  const widthScreen = Dimensions.get('screen').width;
  const RATIO_BANNER = 343 / 178;
  const [qty, setQty] = useState(1);
  // @ts-ignore
  const id = router?.params?.productId;
  const navigation = useNavigation();
  const { userId } = useAppSelector(state => state.rootConfigSliceReducer);
  const userID = userId.trim().replace(/['"]+/g, '');
  // @ts-ignore
  const { data: product, isLoading } = useGetDetailProduct(id as string);

  const handleIncrement = () => {
    setQty(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  const addItemToCart = async (userId: string) => {
    try {
      // Lấy tài liệu của người dùng
      console.log('phi id is' + userId);
      const userRef = doc(db, 'users', userId);

      // Lấy dữ liệu hiện tại của người dùng
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Kiểm tra xem giỏ hàng có tồn tại không
        if (userData && userData.cart) {
          // Thêm mục mới vào giỏ hàng
          const newCartItem = { productID: id, quantity: qty };
          await updateDoc(userRef, {
            cart: arrayUnion(newCartItem),
          });
          queryClient.invalidateQueries(QUERY_KEYS.CART);
          navigation.navigate(BOTTOM_TAB_CART as never);

          console.log('Item added to cart successfully');
        } else {
          // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới với mục mới
          const newCartItem = { productID: id, quantity: qty };
          await setDoc(userRef, { cart: [newCartItem] }, { merge: true });
          queryClient.invalidateQueries(QUERY_KEYS.CART);
          navigation.navigate(BOTTOM_TAB_CART as never);
          console.log('Cart created and item added to cart successfully');
        }
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error adding item to cart: ', error);
      throw error;
    }
  };

  return (
    <SafeAreaView>
      {!id || id === undefined || isLoading ? (
        <>
          <DetailProductSkeleton />
        </>
      ) : (
        <>
          <Stack
            height={'100%'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <ScrollView>
              <Box
                width={widthScreen}
                height={'250px'}
                // bgColor={'#ccc'}
                position={'relative'}>
                <TouchableOpacity
                  style={{ position: 'absolute', zIndex: 999 }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Box
                    bgColor={'#FFFFFF1A'}
                    padding={'8px'}
                    top={3}
                    left={3}
                    borderRadius={'100px'}>
                    <Ionicons name="arrow-back" color={'#000'} size={26} />
                  </Box>
                </TouchableOpacity>
                {product?.image ? (
                  <Image
                    source={{
                      uri: product?.image,
                    }}
                    width={widthScreen}
                    height={widthScreen / RATIO_BANNER}
                    alt={'image product'}
                  />
                ) : (
                  <></>
                )}
              </Box>
              <Stack space={'8px'}>
                <Stack px={'16px'}>
                  <Text color="#212B36" fontSize={'18px'} fontWeight={600}>
                    Chi tiết sản phẩm
                  </Text>
                  <Text color={'#212B36'} fontSize={'16px'}>
                    {product?.description}
                  </Text>
                </Stack>
                <Box
                  width={'100%'}
                  borderWidth={'1px'}
                  borderColor={'#eaeaea'}
                  borderStyle={'dashed'}
                />
                <HStack
                  space={'5px'}
                  px={'16px'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}>
                  <Text color={'#212B36'} fontSize={'14px'}>
                    Sản phẩm có sẵn:
                  </Text>
                  <Text color={'#212B36'} fontSize={'14px'}>
                    100
                  </Text>
                </HStack>
                <HStack px={'16px'}>
                  <Text color={'#212B36'} fontSize={'26px'}>
                    Giá trị:{' '}
                  </Text>
                  <Text color={'#212B36'} fontSize={'26px'}>
                    {product?.price} VNĐ
                  </Text>
                </HStack>
              </Stack>
            </ScrollView>
            <Box width={'100%'} height={'5px'} bgColor={'#eaeaea'} />
            <Center zIndex={999} mb={8} mt={5}>
              <HStack px={'16px'} space={'20px'}>
                <HStack
                  alignItems={'center'}
                  space={'8px'}
                  px={'16px'}
                  py={'8px'}
                  borderRadius={'16px'}
                  borderColor={'#919EAB'}
                  borderWidth={'1px'}>
                  <TouchableOpacity onPress={handleDecrement}>
                    <AntDesign name="minus" size={16} />
                  </TouchableOpacity>
                  <Text color={'#000'} fontWeight={600} fontSize={'16px'}>
                    {qty}
                  </Text>
                  <TouchableOpacity onPress={handleIncrement}>
                    <AntDesign name="plus" size={16} />
                  </TouchableOpacity>
                </HStack>
                <Button
                  onPress={() => {
                    addItemToCart(userID);
                  }}
                  height={'40px'}
                  bgColor={'#E82629'}
                  borderRadius={'12px'}
                  _pressed={{
                    bgColor: 'rgba(232, 38, 41, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                  px={'16px'}
                  startIcon={
                    <MaterialIcons
                      name={'shopping-cart'}
                      size={24}
                      color={'#FFF'}
                    />
                  }>
                  <Text
                    color={'#FFF'}
                    fontWeight={600}
                    fontSize={'18px'}
                    lineHeight={'20px'}>
                    Thêm vào giỏ hàng
                  </Text>
                </Button>
              </HStack>
            </Center>
          </Stack>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailProductScreen;
