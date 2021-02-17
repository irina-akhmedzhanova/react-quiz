import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../store/actions/quiz';
import classes from './QuizList.module.scss';


function QuizListWithoutConnect({
  quizList,
  loading,
  fetchQuizes
}) {
  useEffect( () => {
    fetchQuizes()
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        { loading && quizList.length !== 0
          ? <Loader/>
          : <ul>
              { quizList.map((item, index) => (
                  <li key={index}>
                    <NavLink to={'/quiz/' + item.id}>
                      {item.text}
                    </NavLink>
                  </li>
                )) }
            </ul>
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  quizList: state.quiz.quizList,
  loading: state.quiz.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizes: () => dispatch(fetchQuizes()),
});

const QuizList = connect(mapStateToProps, mapDispatchToProps)(QuizListWithoutConnect);

export { QuizList };