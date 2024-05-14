import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại không đúng định dạng')
    .max(12, 'Số điện thoại không đúng định dạng')
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{7,8})\b/,
      'Số điện thoại không hợp lệ',
    ),
});
