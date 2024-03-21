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
  return update(ref(db, `users/${userName}/ongoing/`), { [quizId]: true });
};

export const acceptGroupInvitation = (groupId, userName) => {
  return update(ref(db, `users/${userName}/groups/`), { [groupId]: true });
};

export const studentEnrolled = async (username, quizId) => {
  // removes the ongoing quizzes from the user data
  return update(ref(db, `users/${username}/ongoing/`), { [quizId]: null });
}

export const studentParticipated = async (username, quizId, score) => {
  // adds in which quiz the user has prticipated
  return update(ref(db, `users/${username}/enrolled/${quizId}`), score);
}


export const removeInvitation = (quizId, userName) => {
  return update(ref(db, `users/${userName}/invitations/`), { [quizId]: null });
  // return update(ref(db, `users/${userName}/invitations/`), {[quizId]: null});
};

export const removeGroupInvitation = (userName, quizId) => {
  return update(ref(db, `users/${userName}/groupInvitations/`), { [quizId]: null });
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
