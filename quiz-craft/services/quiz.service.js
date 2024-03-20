import { push, ref, get, query, orderByChild, equalTo, update, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (quizData) => {
  return push(ref(db, `quizzes/`), {
    ...quizData
  });
};

export const inviteStudent = async (username, invitation, quizId) => {
  return update(ref(db, `users/${username}/invitations/${quizId}`), invitation);
};

export const inviteAcceptedQuiz = async (username, quizId) => {
  return update(ref(db, `quizzes/${quizId}/participants/`), { [username]: true });
};

export const removeFromInvated = async (username, quizId) => {
  return update(ref(db, `quizzes/${quizId}/invited/`), { [username]: null });
};

export const participated = async (username, quizId, score) => {
  // adds in which quiz the user has prticipated
  return update(ref(db, `quizzes/${quizId}/participated/${username}`), score);
}

export const removeFromParticipatns = async (username, quizId) => {
  return update(ref(db, `quizzes/${quizId}/participants/`), { [username]: null });
};

// Function to retrieve quizzes by owner's ID
export const getQuizzesByOwner = async (ownerId) => {
  return get(query(ref(db, 'quizzes'), orderByChild('ownerId'), equalTo(ownerId)));
};

// Function to get all quizzes from Firebase Realtime Database
export const getAllQuizzes = async () => {
  return get(query(ref(db, 'quizzes')));
};

export const getQuizData = async (id) => {
  // return get(query(ref(db, 'quizzes'), orderByChild('id'), equalTo(id)));
  return get(ref(db, `quizzes/${id}`));
};

export const editQuiz = (quizId, data) => {
  return update(ref(db, `quizzes/${quizId}`), data);
}

export const removeQuiz = (quizId) => {
  return remove(ref(db, `quizzes/${quizId}`));
}