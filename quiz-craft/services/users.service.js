import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUserHandle = (userData) => {
  return set(ref(db, `users/${userData.username}`), {
      ...userData,
  });
}

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const handleToggleRole = async (userId, newRole) => {
  try {
      await update(ref(db, `users/${userId}`), { role: newRole });
  } catch (error) {
      console.error('Error updating user role:', error);
  }
};