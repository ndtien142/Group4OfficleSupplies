import firestore from '@react-native-firebase/firestore';
import { CART_COLLECTION } from '../constants/collection.constants';
import { ICart, ICartItem } from '../interface/cart.interface';

export const getCartItemByUserID = async (
  userID: string,
): Promise<ICart | null> => {
  try {
    const docRef = await firestore().collection(CART_COLLECTION).doc(userID);
    const doc = await docRef.get();

    if (doc.exists) {
      return doc.data() as ICart;
    } else {
      console.log('this user has no cart!');
      return null;
    }
  } catch (error) {
    console.error('Error getting product by ID: ', error);
    throw error;
  }
};
