import { useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import classes from './Auth.module.scss';

//Email validation (taken from chromium)
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


function AuthWithoutConnect({auth}) {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      }
    }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const loginHandler = () => {
    auth(
      formControls.email.value,
      formControls.password.value,
      true
    )
  };

  const registerHandler = () => {
    auth(
      formControls.email.value,
      formControls.password.value,
      false
    )
  };

  const submitHandler = (event) => {
    event.preventDefault()
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    };
    if (validation.email) {
      isValid  = validateEmail(value) && isValid
    };
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    };

    return isValid
  };

  const onChangeHandler = (event, controlName) => {
    const formControlsChanged = { ...formControls };
    const controlChanged = { ...formControls[controlName]};
    controlChanged.value = event.target.value;
    controlChanged.touched = true;
    controlChanged.valid = validateControl(controlChanged.value, controlChanged.validation)
    formControlsChanged[controlName] = controlChanged;

    let isFormValid = true;
    Object.keys(formControlsChanged).forEach((name) =>{
      isFormValid = formControlsChanged[name].valid && isFormValid
    });

    setFormControls(formControlsChanged);
    setIsFormValid(isFormValid)
  };
  
  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form 
          className={classes.AuthForm}
          onSubmit={submitHandler}
        >
         { Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
              <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                label={control.label}
                errorMessage={control.errorMessage}
                valid={control.valid}
                touched={control.touched}
                shoudValidate={!!control.validation}
                onChange={event => onChangeHandler(event, controlName)}
              />
            ) 
          }) }
          <Button
            type="success"
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Войти
          </Button>
          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
});

const Auth = connect(null, mapDispatchToProps)(AuthWithoutConnect);

export { Auth };