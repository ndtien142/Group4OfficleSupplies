import { setIsOpenSelectMethodImagePicker } from '@group4officesupplies/common/components/image-picker/imagePicker.slice';
import SelectMethodImagePicker from '@group4officesupplies/common/components/image-picker/SelectMethodImagePicker';
import { useAppDispatch } from '@group4officesupplies/common/hooks/useAppDispatch';
import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, Image } from 'react-native';

const ManagerContainer = () => {
  const dispatch = useAppDispatch();
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [imageUris, setImageUris] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addProduct = () => {
    const newProduct = {
      type: productType,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      images: imageUris,
    };
    setProducts([...products, newProduct]);
    clearFields();
  };

  const deleteProduct = index => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const editProduct = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
    clearFields();
    setEditingIndex(null);
  };

  const clearFields = () => {
    setProductType('');
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
    setImageUris([]);
  };

  const selectImage = () => {
    // Logic chọn hình ảnh
    dispatch(setIsOpenSelectMethodImagePicker(true));
  };

  const startEditing = index => {
    const productToEdit = products[index];
    setProductType(productToEdit.type);
    setProductName(productToEdit.name);
    setProductPrice(productToEdit.price);
    setProductQuantity(productToEdit.quantity);
    setImageUris(productToEdit.images);
    setEditingIndex(index);
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Quản Lý Sản Phẩm
        </Text>
        <TextInput
          placeholder="Loại hàng"
          value={productType}
          onChangeText={text => setProductType(text)}
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <TextInput
          placeholder="Tên sản phẩm"
          value={productName}
          onChangeText={text => setProductName(text)}
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <TextInput
          placeholder="Giá sản phẩm"
          value={productPrice}
          onChangeText={text => setProductPrice(text)}
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <TextInput
          placeholder="Số lượng"
          value={productQuantity}
          onChangeText={text => setProductQuantity(text)}
          style={{
            marginBottom: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Button title="Thêm" onPress={addProduct} />
          </View>
          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <Button title="Xóa" onPress={clearFields} />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Button
              title="Sửa"
              onPress={
                editingIndex !== null
                  ? () =>
                      editProduct(editingIndex, {
                        type: productType,
                        name: productName,
                        price: productPrice,
                        quantity: productQuantity,
                        images: imageUris,
                      })
                  : () => {}
              }
            />
          </View>
        </View>
        <Button title="Chọn Hình Ảnh" onPress={selectImage} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {imageUris.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                marginBottom: 10,
              }}
            />
          ))}
        </View>
        {products.map((product, index) => (
          <View
            key={index}
            style={{ marginTop: 10, borderBottomWidth: 1, padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
            <Text>Loại hàng: {product.type}</Text>
            <Text>Giá: {product.price}</Text>
            <Text>Số lượng: {product.quantity}</Text>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {product.images.map((uri, imgIndex) => (
                <Image
                  key={imgIndex}
                  source={{ uri }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Button title="Sửa" onPress={() => startEditing(index)} />
              <Button title="Xóa" onPress={() => deleteProduct(index)} />
            </View>
          </View>
        ))}
      </View>
      <Button
        title="Thoát"
        onPress={clearFields}
        style={{ marginHorizontal: 20, marginBottom: 20 }}
      />
      <SelectMethodImagePicker />
    </ScrollView>
  );
};

export default ManagerContainer;
