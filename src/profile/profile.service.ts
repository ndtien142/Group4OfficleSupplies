import { USER_COLLECTION } from '@group4officesupplies/common/constants/collection.constants';
import firestore from '@react-native-firebase/firestore';
import { IUserResponse } from './profile.interface';

export const getProfileUser = async (
  userId: string,
): Promise<IUserResponse | null> => {
  try {
    console.log('debug userId:', userId);
    const docRef = await firestore().collection(USER_COLLECTION).doc(userId);
    console.log('docRef:::', docRef);
    const doc = await docRef.get();
    console.log('doc:', doc);
    // if (doc.exists) {
    var result = doc.data() as IUserResponse;
    // result.id = userId;
    console.log('user::', result);
    return result;
    // } else {
    //   console.log('No such user!');
    //   return null;
    // }
  } catch (error) {
    console.error('Error getting product by ID: ', error);
    throw error;
  }
};
