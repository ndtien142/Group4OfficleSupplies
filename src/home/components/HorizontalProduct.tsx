import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import { FlatList, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from './ProductItem';
import PromotionProductItem from './PromotionalProductItem'; // Import PromotionProductItem
import { IProductSection } from '../interface';
import { useGetProducts } from '@group4officesupplies/common/hooks/product/useGetProduct';
import { useGetPromotionProduct } from '@group4officesupplies/common/hooks/product/useGetPromotionProduct';
import { getProductById } from '@group4officesupplies/common/services/product.service';
import { IProduct } from '@group4officesupplies/common/interface/product.interface';
import { DETAIL_PRODUCT } from '@group4officesupplies/common/constants/route.constant';

const HorizontalProduct = ({
  dataSection,
}: {
  dataSection: IProductSection;
}) => {
  const navigation = useNavigation();
  const { data: normalProduct } = useGetProducts();
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleProductPress = (item: IProduct) => {
    // @ts-ignore
    navigation.navigate(DETAIL_PRODUCT as never, { productId: item?.id });
  };

  return (
    <>
      <HeaderSection
        title="Products"
        handleNavigate={() => setShowAllProducts(true)}
      />
      <HStack width={'100%'} overflowY={'auto'} px={3}>
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
