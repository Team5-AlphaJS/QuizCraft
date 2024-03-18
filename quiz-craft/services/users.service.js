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

export const acceptInvitation = (quizId, userName) => {
  return update(ref(db, `users/${userName}/ongoing/`), {[quizId]: true});
};

export const removeInvitation = (quizId, userName) => {
  return update(ref(db, `users/${userName}/invitations/`), {[quizId]: null});
  // return update(ref(db, `users/${userName}/invitations/`), {[quizId]: null});
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const editUser = (data) => {
  return update(ref(db, `users/${data.username}`), data);
}

export const handleToggleRole = async (userId, newRole) => {
  try {
    await update(ref(db, `users/${userId}`), { role: newRole });
  } catch (error) {
    console.error('Error updating user role:', error);
  }
};

export const getAllUsers = async () => {
  return get(query(ref(db, 'users')));
}
