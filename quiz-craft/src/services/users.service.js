import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';


/**
 * Creates a user handle in the database.
 * 
 * @param {string} username - The username of the user.
 * @param {string} uid - The unique identifier of the user.
 * @param {string} email - The email address of the user.
 * @param {string} role - The role of the user.
 * @returns {Promise} A promise that resolves when the user handle is created in the database.
 */
export const createUserHandle = (username, uid, email, role) => {
  return set(ref(db, `users/${username}`), {
      uid,
      email,
      username,
      role,
      createdOn: Date.now(),
      firstName: '',
      lastName: '',
  });
}

/**
 * Retrieves user data based on the provided user ID.
 *
 * @param {string} uid - The user ID to retrieve data for.
 * @returns {Promise} A promise that resolves with the user data.
 */
export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

/**
 * Handles toggling the role of a user.
 * @param {string} userId - The ID of the user.
 * @param {string} newRole - The new role to assign to the user.
 * @returns {Promise<void>} - A promise that resolves when the user role is updated successfully.
 */
export const handleToggleRole = async (userId, newRole) => {
  try {
      await update(ref(db, `users/${userId}`), { role: newRole });
  } catch (error) {
      console.error('Error updating user role:', error);
  }
};