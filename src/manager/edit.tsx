import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { editProduct } from './manager.service';
import { getProductById } from '@group4officesupplies/common/services/product.service';
import { IProduct } from '@group4officesupplies/common/interface/product.interface'; // Import IProduct interface

const ManagerEditContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState<IProduct | null>(null); // Specify type as IProduct
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    console.log("productId:", productId);
    if (productId) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(productId);
          if (productData) {
            setProduct(productData);
            setTitle(productData.title);
            setBrand(productData.brand);
            setDescription(productData.description);
            setPrice(productData.price.toString());
            setImage(productData.image);
          } else {
            Alert.alert('Error', 'Product not found');
            navigation.goBack();
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          Alert.alert('Error', 'Failed to fetch product');
          navigation.goBack();
        }
      };

      fetchProduct();
    } else {
      Alert.alert('Error', 'Product ID not provided');
      navigation.goBack();
    }
  }, [productId, navigation]);

  const handleSave = async () => {
    try {
      await editProduct(productId, { id:'',title, brand, description, price: parseFloat(price), image,status:'' });
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  if (!product) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Brand"
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default ManagerEditContainer;
