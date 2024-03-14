import { get, set, ref, query, update, push } from 'firebase/database';
import { db } from '../config/firebase-config';

// Function to retrieve a quiz by its ID
export const getQuizById = (quizId) => {
  return get(ref(db, `quizzes/${quizId}`));
};

// Function to create a new quiz
export const createQuiz = (quizData) => {
  return set(ref(db, `quizzes/${quizData.title}`), {
    ...quizData
  });
};
//Function to create question
export const createQuestion = (quizId, questionData) => {
  return set(ref(db, `quizzes/${quizId}/${questionData.id}`), {
    ...questionData
  })
}

// Function to update an existing quiz
export const updateQuiz = (quizId, newData) => {
  return update(ref(db, `quizzes/${quizId}`), newData);
};

// Function to retrieve all quizzes
export const getAllQuizzes = () => {
  return get(query(ref(db, 'quizzes')));
};

// Function to delete a quiz
export const deleteQuiz = (quizId) => {
  return update(ref(db, `quizzes/${quizId}`), null);
};