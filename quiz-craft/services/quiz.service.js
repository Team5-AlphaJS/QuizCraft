import { set, ref, get, query,orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (quizData) => {
  return set(ref(db, `quizzes/${quizData.title}`), {
    ...quizData
  });
};

// Function to retrieve quizzes by owner's ID
export const getQuizzesByOwner = async (ownerId) => {
  return get(query(ref(db, 'quizzes'), orderByChild('ownerId'), equalTo(ownerId)));
};

// Function to get all quizzes from Firebase Realtime Database
export const getAllQuizzes = async () => {
  return get(query(ref(db, 'quizzes')));
};

