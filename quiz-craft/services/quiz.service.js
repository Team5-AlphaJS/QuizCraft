import { set, push, ref, get, query, orderByChild, equalTo, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (quizData) => {
  return push(ref(db, `quizzes/`), {
    ...quizData
  });
};

export const inviteStudent = (username, invitation, quizId) => {
  return update(ref(db, `users/${username}/ongoing/${quizId}`), invitation);
};

// Function to retrieve quizzes by owner's ID
export const getQuizzesByOwner = async (ownerId) => {
  return get(query(ref(db, 'quizzes'), orderByChild('ownerId'), equalTo(ownerId)));
};

// Function to get all quizzes from Firebase Realtime Database
export const getAllQuizzes = async () => {
  return get(query(ref(db, 'quizzes')));
};

export const getQuizData = (id) => {
  return get(query(ref(db, 'quizzes'), orderByChild('id'), equalTo(id)));
};

export const editQuiz = (data) => {
  return update(ref(db, `quizzes/${data.title}`), data);
}