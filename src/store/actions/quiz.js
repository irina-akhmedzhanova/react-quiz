import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  RETRY
} from './actionsTypes';

const URL_DB = 'http://localhost:3000/quizes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await fetch(URL_DB);
      const results = await response.json();
      const quizes = [];
      results.forEach((item, index) => {
        quizes.push({
          id: item.id,
          text: `Тест № ${index + 1}`
        })
      });
      dispatch(fetchQuizesSucces(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
};

export const fetchQuizesStart = () => ({
  type: FETCH_QUIZES_START
});

export const fetchQuizesSucces = (quizes) => ({
  type: FETCH_QUIZES_SUCCESS,
  quizes
});

export const fetchQuizesError = (e) => ({
  type: FETCH_QUIZES_ERROR,
  error: e
});

export const fetchQuizSuccess = (currentQuiz) => ({
  type: FETCH_QUIZ_SUCCESS,
  currentQuiz
});

export function fetchQuizById(id) {

  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await fetch(URL_DB + '/' + id);
      const results = await response.json();
      const currentQuiz = results["test" + id];
      dispatch(fetchQuizSuccess(currentQuiz))
    } catch(e) {
      dispatch(fetchQuizesError())
    }
  }
};

export const quizSetState = (answerState, results) => ({
  type: QUIZ_SET_STATE,
  answerState, results
});

export const finishQuiz = () => ({
  type: FINISH_QUIZ
});

export const nextQuestion = (number) => ({
  type: NEXT_QUESTION,
  number
});

export function quizAnswerClick(answerId) {

  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return
      }
    };
    const question = state.currentQuiz[state.activeQuestion];
    const results = state.results;
    const timeout = window.setTimeout(() =>{
      if ((state.activeQuestion + 1) === state.currentQuiz.length) {
        dispatch(finishQuiz())
      } else {
        dispatch(nextQuestion(state.answerState + 1))
      }
      window.clearTimeout(timeout)
    }, 700);
    if (question.rightAnswerId === answerId) {
      dispatch(quizSetState(
        {[answerId]: 'success'}, 
        {...results, ...{[question.id]: 'success'}}
      ))
    } else {
      dispatch(quizSetState(
        {[answerId]: 'error'}, 
        {...results, ...{[question.id]: 'error'}}
      ))
    }
  }
};

export const retryQuiz = () => ({
  type: RETRY
});