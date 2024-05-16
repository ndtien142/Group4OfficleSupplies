import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { IUploadProduct } from './manage.interface';
import { uploadProduct } from './manager.service';
import { useAppDispatch } from '@group4officesupplies/common/hooks/useAppDispatch';
import { setIsOpenSelectMethodImagePicker, setNewImage } from '@group4officesupplies/common/components/image-picker/imagePicker.slice';
import SelectMethodImagePicker from '@group4officesupplies/common/components/image-picker/SelectMethodImagePicker';
import { useAppSelector } from '@group4officesupplies/common/hooks/useAppSelector';
import { useFocusEffect } from '@react-navigation/native';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const { imagePicker } = useAppSelector(state => state.imagePickerReducer);

  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const selectImage = () => {
    dispatch(setIsOpenSelectMethodImagePicker(true));
  };

  const addProduct = async () => {
    const newProduct: IUploadProduct = {
      id: generateId(),
      brand,
      title,
      description,
      image: imagePicker.uri,
      price: parseFloat(price),
      status: 'active',
    };
    try {
      await uploadProduct(newProduct);
      clearFields();
      Alert.alert('Success', 'Product added successfully');
      navigation.navigate('ManageListProductContainer');
    } catch (error) {
      console.error('Error adding product: ', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  const clearFields = () => {
    setBrand('');
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUri('');
    dispatch(setNewImage({}));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setNewImage({}));
    }, []),
  );

  return (
    <View style={styles.container}>
      <AntDesign 
        name="arrowleft"
        size={30}
        color="black"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      <Text style={styles.title}>Add New Product</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Brand"
          value={brand}
          onChangeText={setBrand}
          style={styles.input}
        />
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Select Image" onPress={selectImage} />
        <SelectMethodImagePicker />
      </View>
      {imagePicker?.uri?.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            key={imagePicker?.uri}
            source={{ uri: imagePicker?.uri }}
            style={styles.image}
          />
          <TouchableOpacity onPress={clearFields}>
            <AntDesign name="delete" size={30} />
          </TouchableOpacity>
        </View>
      )}
      <Button title="Add Product" onPress={addProduct} />
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
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default AddProduct;
