import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import { FlatList, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from './ProductItem';
import PromotionProductItem from './PromotionalProductItem'; // Import PromotionProductItem
import { IProductSection } from '../interface';
import { useGetProducts } from '@group4officesupplies/common/hooks/product/useGetProduct';
import { useGetPromotionProduct } from '@group4officesupplies/common/hooks/product/useGetPromotionProduct';

const HorizontalProduct = ({
  dataSection,
}: {
  dataSection: IProductSection;
}) => {
  const navigation = useNavigation();
  const { data: normalProduct } = useGetProducts();
  const { data: promotionProduct } = useGetPromotionProduct();

  console.log(promotionProduct);
  const [showAllProducts, setShowAllProducts] = useState(false);

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
          data={promotionProduct}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            // @ts-ignore
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
          data={normalProduct}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            // @ts-ignore
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
