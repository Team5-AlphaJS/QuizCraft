import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByUsername = (username: string): Promise<object> => {
  return get(ref(db, `users/${username}`));
};

// /**
//  * Creates a user handle in the database.
//  * 
//  * @param {string} username - The username of the user.
//  * @param {string} uid - The unique identifier of the user.
//  * @param {string} email - The email address of the user.
//  * @param {string} role - The role of the user.
//  * @returns {Promise} A promise that resolves when the user handle is created in the database.
//  */
// export const createUserHandle = (username, uid, email, role) => {
//   return set(ref(db, `users/${username}`), {
//       uid,
//       email,
//       username,
//       role,
//       createdOn: Date.now(),
//       firstName: '',
//       lastName: '',
//   });
// }

export const createUserHandle = (userData) => {
  return set(ref(db, `users/${userData.username}`), {
      ...userData,
  });
}

export const getUserData = (uid: string): Promise<any> => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const handleToggleRole = async (userId: string, newRole: string): Promise<void> => {
  try {
      await update(ref(db, `users/${userId}`), { role: newRole });
  } catch (error) {
      console.error('Error updating user role:', error);
  }
};