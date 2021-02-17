import { AnswerItem } from './AnswerItem/AnswerItem';
import classes from './AnswersList.module.scss';

const AnswersList = ({
  answers,
  onAnswerClick,
  answerState
}) => (
  <ul className={classes.AnswersList}>
    { answers?.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={onAnswerClick}
          state={answerState ? answerState[answer.id] : null}
        />
      )
    }) }
  </ul>
)

export { AnswersList };
