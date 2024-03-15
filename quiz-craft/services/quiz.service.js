import { set, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (quizData) => {
  return set(ref(db, `quizzes/${quizData.title}`), {
    ...quizData
  });
};