import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import classes from './FinishedQuiz.module.scss';
import cn from 'classnames';

const FinishedQuiz = ({
  results,
  quiz,
  onRetry
}) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++
    }
    return total
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        { quiz.map((quizItem, index) => {
          const cls = [
            'fa', 
            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[quizItem.id]]
          ]

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cn(cls.join(' '))}/>
            </li>
          )
        }) }
      </ul>
      <p>Верно {successCount} из {quiz.length}</p>
      <div>
        <Button 
          onClick={onRetry} 
          type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">
            Перейти к списку тестов
          </Button>
        </Link>
      </div>
    </div>
  )
};

 export { FinishedQuiz };