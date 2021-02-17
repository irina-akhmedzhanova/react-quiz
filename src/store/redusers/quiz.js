import  {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  RETRY
} from '../actions/actionsTypes';

const initialState = {
  quizList: [],
  loading: false,
  error: null,
  results: {},
  answerState: null,
  isFinished: false,
  activeQuestion: 0,
  currentQuiz: []
};

export function quizReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }

    case FETCH_QUIZES_SUCCESS: 
       return {
        ...state, loading: false, quizList: action.quizes
      }

      case FETCH_QUIZ_SUCCESS: 
        return {
        ...state, loading: false, currentQuiz: action.currentQuiz
      }  

    case FETCH_QUIZES_ERROR: 
      return {
      ...state, loading: false, error: action.error
    }

    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results
      }

    case FINISH_QUIZ:
      return {
        ...state, isFinished: true
      }

    case NEXT_QUESTION:
      return {
        ...state, answerState: null, activeQuestion: action.number
      }

    case RETRY:
      return {
        ...state, 
        answerState: null, 
        isFinished: false, 
        activeQuestion: 0, 
        results: {},
      }

    default: return state
  }
}