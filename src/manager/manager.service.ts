import firestore from '@react-native-firebase/firestore';
import { IUploadProduct,IDeletedProduct,IEditedProduct } from './manage.interface';
import { PRODUCT_COLLECTION,PRODUCT_PROMOTION_COLLECTION } from '@group4officesupplies/common/constants/collection.constants';

export const uploadProduct = async (product: IUploadProduct): Promise<void> => {
  try {
    await firestore().collection(PRODUCT_COLLECTION).add(product);
    console.log('Product uploaded successfully');
  } catch (error) {
    console.error('Error uploading product: ', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await firestore().collection(PRODUCT_COLLECTION).doc(productId).delete();
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product: ', error);
    throw error;
  }
};

export const editProduct = async (productId: string, updatedProduct: IEditedProduct): Promise<void> => {
  try {
    await firestore().collection(PRODUCT_COLLECTION).doc(productId).update(updatedProduct);
    console.log('Product updated successfully');
  } catch (error) {
    console.error('Error updating product: ', error);
    throw error;
  }
};