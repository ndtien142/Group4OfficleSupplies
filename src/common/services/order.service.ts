import firestore from '@react-native-firebase/firestore';
import { USER_COLLECTION } from '../constants/collection.constants';
import { IOrder, IUser } from '../interface/user.interface';

export const getOrderByUserID = async (
  userID: string,
): Promise<IOrder[] | null> => {
  try {
    const docRef = await firestore().collection(USER_COLLECTION).doc(userID);
    const doc = await docRef.get();

    if (doc.exists) {
      const userData = doc.data() as IUser;
      const orders: IOrder[] = userData.orders;

      return orders;
    } else {
      console.log('this user has no orders!');
      return null;
    }
  } catch (error) {
    console.error('Error getting orders by ID: ', error);
    throw error;
  }
};
