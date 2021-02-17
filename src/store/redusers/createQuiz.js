import { ADD_QUESTION, RESET } from '../actions/actionsTypes';

const initialState = {
  newQuiz: [],
};

export function createQuizReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state, 
        newQuiz: [...state.newQuiz, action.item]
      }

    case RESET:
      return {
        ...state, newQuiz: []
      }

    default: 
      return state
  }
}