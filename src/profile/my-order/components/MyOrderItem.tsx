import { Badge, Box, HStack, Image, Stack, Text } from 'native-base';
import React from 'react';

const MyOrderItem = () => {
  return (
    <Stack
      bgColor={'#FFF'}
      padding={'16px'}
      borderRadius={'8px'}
      borderWidth={'1px'}
      borderColor={'#EEE'}>
      <Text fontSize={'16px'}>
        Mã đơn hàng:
        <Text color={'#E82629'} fontWeight={600}>
          #2112323
        </Text>
      </Text>
      <HStack alignItems={'center'} justifyContent={'space-between'} mt={3}>
        <Box
          width={'100px'}
          height={'100px'}
          bgColor={'#E826291A'}
          borderRadius={'8px'}>
          <Image
            alt="image product"
            source={{
              uri: 'https://vanphongphambanhat.com/wp-content/uploads/2021/06/gioi-thieu-ve-chiec-but-bi.png',
            }}
          />
        </Box>
        <Stack>
          <Text>
            Giá trị đơn hàng: <Text>1000</Text>
          </Text>
          <HStack>
            <Text>Trạng thái :</Text>
            <Badge colorScheme="success" borderRadius={'8px'}>
              Đang vận chuyển
            </Badge>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default MyOrderItem;
