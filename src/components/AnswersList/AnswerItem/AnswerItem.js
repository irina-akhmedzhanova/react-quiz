import classes from './AnswerItem.module.scss';
import cn from 'classnames';

const AnswerItem = ({
  state,
  answer,
  onAnswerClick
}) => {
  const cls = [classes.AnswerItem]
  if (state) {
    cls.push(classes[state])
  };

  return (
    <li className={cn(cls.join(' '))} 
        onClick={() => onAnswerClick(answer.id)}>
      { answer.text }
    </li>
  )
};

export { AnswerItem };