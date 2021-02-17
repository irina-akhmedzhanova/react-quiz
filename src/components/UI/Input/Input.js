import classes from './Input.module.scss';
import cn from 'classnames';

const Input = ({
  type,
  label,
  value,
  onChange,
  ...props
}) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  function isInvalid(props) {
    return !props.valid && props.shoudValidate && props.touched
  };

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  };

  return (
    <div className={cn(cls.join(' '))}>
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input 
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      { isInvalid(props)
        ? <span>{ props.errorMessage || 'Введите верное значение' }</span>
        : null }
    </div>
  )
}

export { Input };