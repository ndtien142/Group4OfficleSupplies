import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useIsFocused } from '@react-navigation/native';  // Import useIsFocused
import { getProducts } from '@group4officesupplies/common/services/product.service';
import { deleteProduct } from '../manager.service';
import { IProduct } from '@group4officesupplies/common/interface/product.interface';
import { IUploadProduct } from '../manage.interface';

const ManageListProductContainer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (isFocused) {  
      fetchProducts();
    }
  }, [isFocused]); 

  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditProduct = async (productId) => {
    const product = products.find(item => item.id === productId);
    if(product) {
      navigation.navigate('ManagerEditContainer', { productId });
    } else {
      Alert.alert('Error', 'Product not found');
    }
  };
  
  const handleHideProduct = async (productId) => {
    const product = products.find(item => item.id === productId);
    if(product) {
      try {
        await deleteProduct(productId);
        setProducts(prevProducts => prevProducts.map(item => {
          if (item.id === productId) {
            return {...item, status: 'inactive'};
          }
          return item;
        }));
        Alert.alert('Success', 'Product hidden successfully');
      } catch (error) {
        console.error('Error hiding product:', error);
        Alert.alert('Error', 'Failed to hide product');
      }
    } else {
      Alert.alert('Error', 'Product not found');
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
          {products.map(product => 
            product.status === 'active' && (
              <View key={product.id} style={styles.productContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.title}</Text>
                  <Text>Brand: {product.brand}</Text>
                  <Text>Description: {product.description}</Text>
                  <Text>Price: {product.price}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <Button
                    title="Edit"
                    onPress={() => navigation.navigate('ManagerEditContainer', { productId: product.id })}
                  />
                  <Button
                    title="Hide"
                    onPress={() => handleHideProduct(product.id)}
                  />
                </View>
              </View>
            )
          )}
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
    marginLeft: 10,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productImage: {
    width: 100,
    height: 100,
  },
});

export default ManageListProductContainer;
