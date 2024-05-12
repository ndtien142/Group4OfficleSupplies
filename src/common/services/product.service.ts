import firestore from '@react-native-firebase/firestore';
import {
  PRODUCT_COLLECTION,
  PRODUCT_PROMOTION_COLLECTION,
} from '../constants/collection.constants';
import { IProduct, IProductPromotional } from '../interface/product.interface';

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const snapshot = await firestore().collection(PRODUCT_COLLECTION).get();

    // Map over the documents and return the data
    return snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as IProduct;
    });
  } catch (error) {
    console.error('Error getting products: ', error);
    throw error; // Re-throw the error to handle it at the caller level
  }
};

export const getProductById = async (
  productId: string,
): Promise<IProduct | null> => {
  try {
    const docRef = firestore().collection(PRODUCT_COLLECTION).doc(productId);
    const doc = await docRef.get();

    if (doc.exists) {
      return doc.data() as IProduct;
    } else {
      console.log('No such product!');
      return null;
    }
  } catch (error) {
    console.error('Error getting product by ID: ', error);
    throw error;
  }
};

export const getProductPromotional = async (): Promise<
  IProductPromotional[]
> => {
  try {
    const snapshot = await firestore()
      .collection(PRODUCT_PROMOTION_COLLECTION)
      .get();
    console.log('snapshot', snapshot);
    // Map over the documents and return the data
    return snapshot.docs.map(doc => {
      console.log('doc::productPromotional:::', doc.data());
      return { id: doc.id, ...doc.data() } as IProductPromotional;
    });
  } catch (error) {
    console.error('Error getting promotion: ', error);
    throw error; // Re-throw the error to handle it at the caller level
  }
};
