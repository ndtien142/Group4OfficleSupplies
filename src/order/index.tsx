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
import { useGetDetailProduct } from '@group4officesupplies/detail-product/hooks/useGetDetailProduct';
import { IProduct } from '@group4officesupplies/common/interface/product.interface';
import { getProductById } from '@group4officesupplies/common/services/product.service';
import { useGetOrder } from './hooks/useGetOrder';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';

const OrderScreenContainer = () => {
  const router = useRoute();
  const widthScreen = Dimensions.get('screen').width;
  const { userId } = useAppSelector(state => state.rootConfigSliceReducer);
  const userID = userId.trim().replace(/['"]+/g, '');
  const navigation = useNavigation();
  const { data: orders, isLoading } = useGetOrder(userID as string);

  return (
    <SafeAreaView>
      <Stack
        height={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        {/* Header */}
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
            Đơn hàng của tôi
          </Text>
        </Box>
        {/* End Header */}

        {/* Content */}
        <ScrollView style={{ marginTop: -50, marginBottom: 50 }} zIndex={-10}>
          <Stack padding={'100px'} space={'10px'}>
            {orders?.map((order, index) => (
              <Stack key={index} margin={'20px'}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  marginLeft={'-100px'}>
                  <Image
                    source={{
                      uri: order?.image, // Sử dụng link hình ảnh từ sản phẩm
                    }}
                    width={'80px'}
                    height={'80px'}
                    marginLeft={'20px'}
                    alt={'image product'}
                  />
                  <Box
                    borderRadius={'12px'}
                    width={'200px'}
                    height={'80px'}
                    marginLeft={'20px'}
                    justifyContent={'space-between'}>
                    <HStack width={'300px'}>
                      <Text color={'#000'}>{order.title}</Text>{' '}
                      {/* Hiển thị tên sản phẩm */}
                    </HStack>
                    <HStack>
                      <Text>Trạng thái: {order.state}</Text>
                    </HStack>
                    <HStack>
                      <Text color={'#000'}>Số lượng: {order.quantity} </Text>{' '}
                      <Text color={'#000'}>Đơn giá: {order.price} </Text>{' '}
                      <Text color={'#000'}>
                        Thành tiền:{order.quantity * order.price}{' '}
                      </Text>{' '}
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
        {/* End Footer */}
      </Stack>
    </SafeAreaView>
  );
};

export default OrderScreenContainer;
