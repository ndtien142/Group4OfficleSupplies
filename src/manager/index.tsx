import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  setIsOpenSelectMethodImagePicker,
  setNewImage,
} from '@group4officesupplies/common/components/image-picker/imagePicker.slice';
import { useAppDispatch } from '@group4officesupplies/common/hooks/useAppDispatch';
import { IUploadProduct } from './manage.interface';
import { uploadProduct } from './manager.service';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import AntDesign
import SelectMethodImagePicker from '@group4officesupplies/common/components/image-picker/SelectMethodImagePicker';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';
import { HStack } from 'native-base';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);

  const { imagePicker } = useAppSelector(state => state.imagePickerReducer);
  console.log(imagePicker);
  const selectImage = () => {
    dispatch(setIsOpenSelectMethodImagePicker(true));
  };
  const addProduct = async () => {
    const newProduct: IUploadProduct = {
      type: productType,
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity, 10),
      images: imageUris,
    };
    try {
      await uploadProduct(newProduct);
      clearFields();
      navigation.goBack(); // Quay trở lại màn hình trước đó
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const clearFields = () => {
    setProductType('');
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
    setImageUris([]);
  };

  const handleRemoveImagePicker = () => {
    dispatch(setNewImage({}));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setNewImage({}));
    }, []),
  );

  return (
    <View style={styles.container}>
      <AntDesign // Thêm nút quay lại ở góc trái trên
        name="arrowleft"
        size={30}
        color="black"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      <Text style={styles.title}>Thêm Sản Phẩm Mới</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Loại hàng"
          value={productType}
          onChangeText={setProductType}
          style={styles.input}
        />
        <TextInput
          placeholder="Tên sản phẩm"
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
        />
        <TextInput
          placeholder="Giá sản phẩm"
          value={productPrice}
          onChangeText={setProductPrice}
          style={styles.input}
        />
        <TextInput
          placeholder="Số lượng"
          value={productQuantity}
          onChangeText={setProductQuantity}
          style={styles.input}
        />
        <Button title="Chọn Hình Ảnh" onPress={selectImage} />
        <SelectMethodImagePicker />
      </View>
      {imagePicker?.uri?.length && (
        <HStack alignItems={'center'} space={'12px'}>
          <View style={styles.imageContainer}>
            <Image
              key={imagePicker?.uri}
              source={{ uri: imagePicker?.uri }}
              style={styles.image}
            />
          </View>
          <TouchableOpacity onPress={handleRemoveImagePicker}>
            <AntDesign name="delete" size={30} />
          </TouchableOpacity>
        </HStack>
      )}
      <Button title="Thêm Sản Phẩm" onPress={addProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default AddProduct;
