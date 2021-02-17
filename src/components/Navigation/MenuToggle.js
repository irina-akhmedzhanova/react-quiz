import classes from './menuToggle.module.scss';
import cn from 'classnames';

const MenuToggle = ({isOpen, onToggle}) => {
  const cls = [
    classes.MenuToggle,
    'fa',
  ];
  if (isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  };

  return (
    <i 
      className={cn(cls.join(' '))}
      onClick={onToggle}
    />
  )
};

export { MenuToggle };