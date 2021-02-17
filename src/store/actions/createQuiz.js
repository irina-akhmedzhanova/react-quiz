import { ADD_QUESTION, RESET } from './actionsTypes';

const urlDb = 'http://localhost:3000/quizes';

export const addQuestion = (item) => ({
  type: ADD_QUESTION,
  item
});

export const resetCreation = () => ({
  type: RESET,
});

export function createQuiz(quiz) {
  return async dispatch => {
    try {
      await fetch(urlDb, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(quiz, null, 2)
      });
      dispatch(resetCreation());
    } catch(e) {
      console.log(e)
    }
  }
};