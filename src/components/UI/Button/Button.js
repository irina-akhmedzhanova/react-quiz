import classes from './button.module.scss';
import cn from 'classnames';

const Button = ({
  type, 
  onClick, 
  disabled, 
  ...props}) => {
  const cls = [
    classes.Button,
    classes[type]
  ];

  return (
    <button 
      onClick={onClick}
      className={cn(cls.join(' '))}
      disabled={disabled}
    >
      {props.children}
    </button>
  )
}

export { Button };