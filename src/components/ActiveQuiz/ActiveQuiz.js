import { AnswersList } from '../AnswersList/AnswersList';
import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = ({
  answerNumber,
  question,
  quizLength,
  answerState,
  answers,
  onAnswerClick
}) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.question}>
      <span>
        <strong>{answerNumber}.</strong>&nbsp;
        {question}
      </span>
      <small>{answerNumber} of {quizLength}</small>
    </p>
    <AnswersList 
      answerState={answerState}
      answers={answers}
      onAnswerClick={onAnswerClick}
    />
  </div>
);

export { ActiveQuiz };