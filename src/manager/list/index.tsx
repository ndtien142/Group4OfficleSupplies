import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../manager.service';
import { getProducts } from '@group4officesupplies/common/services/product.service';

interface IProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  images: string[];
}

const ManageListProductContainer = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      Alert.alert('Success', 'Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.header}>LIST PRODUCT</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduct')}>
          <AntDesign name="pluscircle" size={30} color="blue" />
        </TouchableOpacity>
        <ScrollView>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text>Type: {product.type}</Text>
                <Text>Price: {product.price}</Text>
                <Text>Quantity: {product.quantity}</Text>
              </View>
              <View style={styles.actionButtons}>
                <Button
                  title="Edit"
                  onPress={() => navigation.navigate('EditProduct', { productId: product.id })}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteProduct(product.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  productInfo: {
    flex: 3,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ManageListProductContainer;
