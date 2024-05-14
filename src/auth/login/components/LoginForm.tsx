import { Box, Pressable, Spinner, Stack, Text } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormLogin } from '../interface';
import { InputText } from '@group4officesupplies/common/components/input';
import { ButtonSubmit } from '@group4officesupplies/common/components/button-submit';
import { useAppDispatch } from '@group4officesupplies/common/hooks/useAppDispatch';
import { loginSchema } from '../login.schema';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setAuthenFormData, setNumberSubmit } from '../login.slice';
import { imageIcon } from '@group4officesupplies/common/constants/imagePath';
import { OTP_SCREEN } from '@group4officesupplies/common/constants/route.constant';
import { setCustomerPhoneNumber } from '@group4officesupplies/auth/otp-input/inputOTP.slice';

interface IAuthenFormProps {
  isLoading: boolean;
}

export const LoginForm = ({ isLoading }: IAuthenFormProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<IFormLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: IFormLogin) => {
    dispatch(
      setAuthenFormData({
        phoneNumber: data?.phoneNumber,
      }),
    );
    dispatch(setCustomerPhoneNumber(data?.phoneNumber));
    dispatch(setNumberSubmit(1));
    navigation.navigate(OTP_SCREEN as never);
  };

  return (
    <Box>
      <Box height="60px">
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <InputText
                autoCapitalize="none"
                borderColor={
                  errors?.phoneNumber ? '#FF4842' : 'rgba(145, 158, 171, 0.32)'
                }
                placeholder="Nhập số điện thoại"
                onChangeText={onChange}
                value={value}
                leftIcon={imageIcon.PHONE}
                keyboardType="numeric"
                InputRightElement={
                  value?.length ? (
                    <Pressable
                      mr="10px"
                      onPress={() => setValue('phoneNumber', '')}>
                      <AntDesign name="delete" size={16} />
                    </Pressable>
                  ) : (
                    <></>
                  )
                }
              />
            );
          }}
        />
        {errors?.phoneNumber && (
          <Text mt="6px" color="#FF0032" ml="20px">
            {errors?.phoneNumber?.message}
          </Text>
        )}
      </Box>
      <ButtonSubmit
        disabled={!isValid || !isDirty}
        onPress={handleSubmit(onSubmit)}
        marginTop="32px"
        rightIcon={
          isLoading ? <Spinner accessibilityLabel="Loading posts" /> : <></>
        }
        content="Đăng nhập/ Đăng ký"
        bgColor={!isValid || !isDirty ? '#F1F1F1' : '#E82629'}
      />
    </Box>
  );
};
