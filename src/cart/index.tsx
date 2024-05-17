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
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartSkeleton from './components/CartSkeleton';
import { useGetCart } from './hooks/useGetCart';
import { useGetDetailProduct } from '@group4officesupplies/detail-product/hooks/useGetDetailProduct';
import { IProduct } from '@group4officesupplies/common/interface/product.interface';
import { getProductById } from '@group4officesupplies/common/services/product.service';
import QuantityControl from './components/QuantityControl';
import { getCartItemByUserID } from '@group4officesupplies/common/services/cart.service';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
  BOTTOM_TAB_ORDER,
  ORDER,
} from '@group4officesupplies/common/constants/route.constant';
import { USER_COLLECTION } from '@group4officesupplies/common/constants/collection.constants';
import { db, auth } from 'firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@group4officesupplies/common/constants/querykeys.constants';

interface Item {
  id: string;
  title: string;
  brand: string;
  qty: number;
  image: string;
  price: number;
}

const CartScreenContainer = () => {
  const router = useRoute();
  const widthScreen = Dimensions.get('screen').width;
  const queryClient = useQueryClient();
  const [qty, setQty] = useState(1);
  const { userId } = useAppSelector(state => state.rootConfigSliceReducer);
  const userID = userId.trim().replace(/['"]+/g, '');

  const navigation = useNavigation();
  const { data: cart, isLoading } = useGetCart(userID as string);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [checkedItems, setCheckedItems] = useState<
    { id: string; isChecked: boolean; quantity: number }[]
  >([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    checkedItems.forEach(checkedItem => {
      if (checkedItem.isChecked) {
        const product = products.find(product => product.id === checkedItem.id);
        if (product) {
          console.log(product.id);
          total += product.price * checkedItem.quantity;
        }
      }
    });
    setTotalPrice(total);
    console.log(total);
    return total;
  };

  const handleCheckboxChange = async (productId: string) => {
    console.log('changeds' + productId);
    const newCart = await getCartItemByUserID(userID);
    setCheckedItems(prevState => {
      const updatedCheckedItems = prevState.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            isChecked: !item.isChecked,
            quantity:
              newCart?.find(cartItem => cartItem.productID === item.id)
                ?.quantity || 0,
          };
        }
        return item;
      });
      return updatedCheckedItems;
    });
  };

  const placeOrder = async (orderData: any) => {
    try {
      const ordersCollection = collection(db, 'orders');
      await addDoc(ordersCollection, {
        ...orderData,
        createdAt: new Date().toISOString(),
      });
      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order: ', error);
      throw error;
    }
  };
  const handlePayment = async () => {
    try {
      const orderItems = await Promise.all(
        checkedItems
          .filter(item => item.isChecked)
          .map(async item => {
            const product = await getProductById(item.id);
            return product
              ? {
                  brand: product.brand,
                  productID: product.id,
                  image: product.image,
                  price: product.price,
                  quantity: item.quantity,
                  title: product.title,
                }
              : null;
          }),
      );

      const validOrderItems = orderItems.filter(item => item !== null);

      if (validOrderItems.length === 0) {
        console.log('Please select at least one product to place an order.');
        return;
      }

      const newOrder = {
        userID,
        items: validOrderItems,
        total: totalPrice,
        createdAt: new Date().toISOString(),
        state: 'Đang xác nhận',
      };

      await placeOrder(newOrder);
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      console.log('Order placed successfully!');
      const userRef = doc(db, 'users', userID);
      await updateDoc(userRef, {
        cart: deleteField(),
      });
      console.log('Order delete cart successfully!');
      setProducts([]);
      setTotalPrice(0);
      navigation.navigate(BOTTOM_TAB_ORDER);
    } catch (error) {
      console.error('Error placing order: ', error);
      console.log('Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart && cart.length > 0) {
        const productPromises = cart.map(async item => {
          const product = await getProductById(item.productID);
          return product;
        });
        const resolvedProducts = await Promise.all(productPromises);
        const validProducts = resolvedProducts.filter(
          (product): product is IProduct =>
            product !== null && product !== undefined,
        );
        setProducts(validProducts); // Cập nhật products

        const newCheckedItems = validProducts.map(product => ({
          id: product.id,
          isChecked: false, // Khởi tạo isChecked cho mỗi sản phẩm là false
          quantity:
            cart?.find(item => item.productID === product.id)?.quantity || 0,
        }));
        setCheckedItems(newCheckedItems); // Cập nhật checkedItems
      } else {
        setProducts([]);
        setCheckedItems([]);
      }
    };

    fetchProducts();
  }, [cart]); // Thêm cart vào mảng dependency

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [checkedItems]);

  return (
    <SafeAreaView>
      {/* {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <View key={index}>
            <Text color={'#000'}>
              Product ID: {item.productID}, Quantity: {item.quantity}
            </Text>
          </View>
        ))
      ) : (
        <Text>No items in cart.</Text>
      )} */}
      {/* Header */}

      <Stack
        height={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Box
          width={widthScreen}
          backgroundColor={'white'}
          position={'absolute'}
          flexDirection={'row'}
          alignItems={'center'}
          zIndex={10}>
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
            {products.map((product, index) => (
              <Stack key={index} margin={'20px'}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  marginLeft={'-100px'}>
                  <Checkbox
                    key={'checkbox#' + index}
                    isChecked={
                      checkedItems.find(
                        checkedItem => checkedItem.id === product.id,
                      )?.isChecked || false
                    }
                    onChange={() => {
                      handleCheckboxChange(product.id);
                      setTotalPrice(calculateTotalPrice());
                      console.log('id is' + product.id);
                    }}
                    margin={'10px'}
                    value={''}
                    aria-label="Chọn"
                  />
                  <Image
                    source={{
                      uri: product?.image, // Sử dụng link hình ảnh từ sản phẩm
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
                    <HStack width={'300px'}>
                      <Text color={'#000'}>{product.title}</Text>{' '}
                      {/* Hiển thị tên sản phẩm */}
                    </HStack>
                    <HStack>
                      <Text color={'#000'}>Số lượng: </Text>{' '}
                      <QuantityControl
                        userID={userID}
                        productID={product.id}
                        quantity={
                          cart?.find(item => item.productID === product.id)
                            ?.quantity || 0
                        }
                      />
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
              Tổng tiền: {totalPrice}
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
              alignItems={'center'}
              //here
              onPress={handlePayment}>
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
