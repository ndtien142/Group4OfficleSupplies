import React from 'react';
import HeaderSection from './HeaderSection';
import { Box, FlatList, HStack, Image, Stack, Text } from 'native-base';
import {
  BOTTOM_TAB_HOME,
  TAB_BOTTOM,
} from '@group4officesupplies/common/constants/route.constant';
import { IProductSection } from '../interface';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HorizontalProduct = ({
  dataSection,
}: {
  dataSection: IProductSection;
}) => {
  const width = 200;
  const RATIO = 3 / 4;
  const navigation = useNavigation();
  return (
    <Stack space={'20px'} width={'100%'}>
      <HeaderSection
        handleNavigate={() => {
          navigation.navigate(
            // @ts-ignore
            TAB_BOTTOM as never,
            {
              screen: BOTTOM_TAB_HOME as never,
            } as never,
          );
        }}
        title={dataSection?.title}
      />
      <Stack width={'100%'}>
        <HStack width={'100%'} overflowY={'auto'}>
          {dataSection?.item && (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={dataSection?.item}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Press to render detail item');
                    }}>
                    <Stack
                      maxWidth={width}
                      width={width / RATIO}
                      space={'12px'}
                      maxHeight={'200px'}>
                      <Box width={'100%'} px={'16px'} maxHeight={'106px'}>
                        <Box
                          width={'100%'}
                          overflow={'hidden'}
                          borderRadius={8}>
                          <Image
                            alt="feature-image"
                            width={'100%'}
                            height={'100%'}
                            resizeMode="cover"
                            source={{
                              uri: item?.image,
                            }}
                            key={`${item?.image} + ${item?.id}`}
                          />
                        </Box>
                      </Box>
                      <HStack
                        width={'100%'}
                        px={'16px'}
                        space={'16px'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Stack width={'90%'}>
                          <Text
                            color={'#000'}
                            fontWeight={600}
                            isTruncated
                            numberOfLines={2}>
                            {item?.title}
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </HStack>
      </Stack>
    </Stack>
  );
};

export default HorizontalProduct;
