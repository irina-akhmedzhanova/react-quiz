import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Button } from '../../components/UI/Button/Button';
import {
  createControl, 
  validate, 
  validateForm
} from '../../Form/Form';
import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';
import { addQuestion, createQuiz } from '../../store/actions/createQuiz';
import classes from './QuizCreator.module.scss';

const createOptionsControl = (number) => (
  createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number,
  }, {required: true})
);

const createFormControls = () => ({
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
    }, {required: true}),
    option1: createOptionsControl(1),
    option2: createOptionsControl(2),
    option3: createOptionsControl(3),
    option4: createOptionsControl(4),
});

function QuizCreatorWithoutConnect({
  newQuiz,
  addQuestion,
  createQuiz
}) {
  const [formControls, setFormControls] = useState(createFormControls());
  const [rightAnswerId, setRigthAnswerId] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault()
  };

  const addQuestionHandler = () => {
    const quiz = newQuiz.concat();
    const index = quiz.length + 1;
    const {question, option1, option2, option3, option4} = formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    };
    addQuestion(questionItem);

    setFormControls(createFormControls());
    setRigthAnswerId(0);
    setIsFormValid(false);
  };

  const createQuizHandler = async () => {
    const quiz0 = {};
    const id = Math.random();
    const quizId = `test${id}`;
    quiz0[quizId] = newQuiz;
    quiz0["id"] = id;
    createQuiz(quiz0);

    setFormControls(createFormControls());
    setRigthAnswerId(0);
    setIsFormValid(false);
  };

  const inputChangeHandler = (value, name) => {
    const formControlsChanged = { ...formControls };
    const controlChanged = { ...formControls[name]};
    controlChanged.touched = true;
    controlChanged.value = value;
    controlChanged.valid = validate(controlChanged.value, controlChanged.validation);
    formControlsChanged[name] = controlChanged;

    setFormControls(formControlsChanged);
    setIsFormValid(validateForm(formControlsChanged));
  };

  const selectChangeHandler = (event) => {
    setRigthAnswerId(+event.target.value)
  };
  
  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        <form onSubmit={submitHandler}>
          { Object.keys(formControls).map((name, index) => {
              const control = formControls[name];

              return (
                <React.Fragment key={name + index}>
                  <Input
                    key={name + index}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shoudValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => inputChangeHandler(event.target.value, name)}
                  />
                  {index === 0 ? <hr/> : null}
                </React.Fragment>
              )
            }) }
          <Select
            label="Выберите правильный ответ"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              {text: 1 , value: 1},
              {text: 2 , value: 2},
              {text: 3 , value: 3},
              {text: 4 , value: 4},
            ]}
          />
          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={newQuiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  newQuiz: state.createQuiz.newQuiz
});

const mapDispatchToProps = (dispatch) => ({
  addQuestion: item => dispatch(addQuestion(item)),
  createQuiz: quiz => dispatch(createQuiz(quiz)),
});

const QuizCreator = connect(mapStateToProps, mapDispatchToProps)(QuizCreatorWithoutConnect);

export { QuizCreator };