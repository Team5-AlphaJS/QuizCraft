import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

export const registerUser = (email: string, password: string): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string): Promise<any> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};