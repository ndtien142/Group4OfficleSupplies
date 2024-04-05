import { auth, db } from '../../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';

interface User {
  uid: string;
  name: string;
  email: string;
}

interface LoginResponse {
  success: boolean;
  user?: User;
}

interface RegisterResponse {
  success: boolean;
}

const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userId = res.user.uid;
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return {
      success: true,
      user: userDoc.data() as User,
    };
  } catch (err: any) {
    console.error(err);
    return { success: false };
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      email,
    });
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false };
  }
};

const logout = async (): Promise<{ success: boolean }> => {
  await signOut(auth);
  return { success: true };
};

export { loginWithEmailAndPassword, logout, registerWithEmailAndPassword };
