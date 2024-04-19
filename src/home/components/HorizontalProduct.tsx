import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import { Box, FlatList, HStack, Image, Stack, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from 'firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductItem from './ProductItem';
import PromotionProductItem from './PromotionalProductItem'; // Import PromotionProductItem
import { IProductSection } from '../interface';

const HorizontalProduct = ({
  dataSection,
}: {
  dataSection: IProductSection;
}) => {
  const navigation = useNavigation();
  const [promotionProducts, setPromotionProducts] = useState<any[]>([]);
  const [normalProducts, setNormalProducts] = useState<any[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchPromotionProducts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'productsPromotional'),
        );
        const promotionProductsData = querySnapshot.docs.map(doc => doc.data());
        console.log(
          'Promotion Products from Firestore:',
          promotionProductsData,
        );
        setPromotionProducts(promotionProductsData);
      } catch (error) {
        console.error('Error fetching promotion products: ', error);
      }
    };

    const fetchNormalProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const normalProductsData = querySnapshot.docs.map(doc => doc.data());
        console.log('Normal Products from Firestore:', normalProductsData);
        setNormalProducts(normalProductsData);
      } catch (error) {
        console.error('Error fetching normal products: ', error);
      }
    };

    fetchPromotionProducts();
    fetchNormalProducts();
  }, []);

  const handleProductPress = (item: any) => {
    navigation.navigate('DetailProduct' as never);
  };

  return (
    <>
      <HeaderSection
        title="Promotion Products"
        handleNavigate={() => setShowAllProducts(true)}
      />
      <HStack width={'100%'} overflowY={'auto'}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={
            showAllProducts ? promotionProducts : promotionProducts.slice(0, 5)
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <PromotionProductItem
                title={item.title}
                brand={item.brand}
                image={item.image}
                price={item.price}
                salePrice={item.salePrice}
              />
            </TouchableOpacity>
          )}
        />
      </HStack>

      <HeaderSection
        title="Products"
        handleNavigate={() => setShowAllProducts(true)}
      />
      <HStack width={'100%'} overflowY={'auto'}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={showAllProducts ? normalProducts : normalProducts.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <ProductItem
                title={item.title}
                brand={item.brand}
                image={item.image}
                price={item.price}
              />
            </TouchableOpacity>
          )}
        />
      </HStack>
    </>
  );
};

export default HorizontalProduct;
