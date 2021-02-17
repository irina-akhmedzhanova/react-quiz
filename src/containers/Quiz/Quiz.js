import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from '../../components/FinnishedQuiz/FinishedQuiz';
import { Loader } from '../../components/UI/Loader/Loader';
import { 
  fetchQuizById, 
  quizAnswerClick, 
  retryQuiz
} from '../../store/actions/quiz';
import classes from './Quiz.module.scss';

function QuizWithoutConnect({
  currentQuiz = [], 
  activeQuestion = 0,
  fetchQuizById,
  loading,
  isFinished,
  results,
  retryQuiz,
  quizAnswerClick,
  answerState,
  ...props
  }) {
  const id = props.match.params.id;
  useEffect( () => {
    fetchQuizById(id);
    return function cleanup() {
      retryQuiz();
     }
  }, [id]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        { loading 
          ? <Loader />
          : isFinished
            ? <FinishedQuiz
                results={results}
                quiz={currentQuiz}
                onRetry={retryQuiz}
              />
            : <ActiveQuiz
                answers={currentQuiz[activeQuestion]?.answers}
                question={currentQuiz[activeQuestion]?.question}
                onAnswerClick={quizAnswerClick}
                quizLength={currentQuiz.length}
                answerNumber={activeQuestion + 1}
                answerState={answerState}
              />
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  results: state.quiz.results,
  answerState: state.quiz.answerState,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  currentQuiz: state.quiz.currentQuiz,
  loading: state.quiz.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: id => dispatch(fetchQuizById(id)),
  quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
  retryQuiz: () => dispatch(retryQuiz()),
});

const Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizWithoutConnect);

export { Quiz };