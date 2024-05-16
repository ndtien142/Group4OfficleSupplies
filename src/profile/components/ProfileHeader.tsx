import SelectMethodImagePicker from '@group4officesupplies/common/components/image-picker/SelectMethodImagePicker';
import { ImagePath } from '@group4officesupplies/common/constants/imagePath';
import { Avatar, Box, Center, Heading, Stack, Text, View } from 'native-base';
import React from 'react';
import { ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileHeader = ({
  name,
  phoneNumber,
  image,
}: {
  name: string;
  phoneNumber: string;
  image?: string;
}) => {
  return (
    <View
      bgColor={'#f8f8f8'}
      width={'100%'}
      position={'relative'}
      minHeight={'300px'}
      height={'300px'}>
      <Box height={'225px'} borderBottomRadius={'36px'} overflow={'hidden'}>
        <ImageBackground
          source={ImagePath.imageBackground}
          alt=""
          resizeMode="cover">
          <Center width={'100%'} height={'225px'}></Center>
        </ImageBackground>
      </Box>

      <Center
        height={'100%'}
        width={'100%'}
        position={'absolute'}
        bottom={'-55px'}>
        <Stack
          alignItems={'center'}
          space={'8px'}
          maxWidth={'247px'}
          borderRadius={'26px'}
          bgColor={'#FFF'}
          width={'247px'}
          // shadow={9}
          style={{
            shadowColor: '#EC3A81',
            shadowOffset: { width: 5, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 10,
          }}
          pb={'26px'}>
          <Center
            width={'78px'}
            height={'78px'}
            bgColor={'red.200'}
            mt={'-35px'}
            borderRadius={'50px'}
            borderWidth={'5px'}
            borderColor={'#FFF'}>
            <Pressable
            //   onPress={handlePressChangeImage}
            >
              <Avatar
                size={'70px'}
                source={{
                  uri: image
                    ? image
                    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}>
                avt
                <Avatar.Badge
                  bg="#E1E8FE"
                  size={'25px'}
                  ml={'-10px'}
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}>
                  <AntDesign name="camerao" size={16} />
                </Avatar.Badge>
              </Avatar>
            </Pressable>
          </Center>
          <TouchableOpacity
            onPress={() => {
              //   navigate(USER_PROFILE);
            }}>
            <Center>
              <Heading fontSize={'20px'} fontFamily={'Averta'} isTruncated>
                {name || ''}
              </Heading>
              <Text mt={'5px'} fontSize={'16px'} fontFamily={'Averta'}>
                {phoneNumber || ''}
              </Text>
            </Center>
          </TouchableOpacity>
        </Stack>
      </Center>
      <SelectMethodImagePicker />
    </View>
  );
};

export default ProfileHeader;
