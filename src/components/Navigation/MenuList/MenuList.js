import { NavLink } from 'react-router-dom';
import { Backdrop } from '../Backdrop/Backdrop';
import classes from './MenuList.module.scss';
import cn from 'classnames';

const MenuList = ({
  isAuthenticated,
  isOpen,
  onClose
}) => {
  const links = isAuthenticated
  ? [
    {to: '/', label: 'Список тестов', exact: true},
    {to: '/quiz-creator', label: 'Создать квиз', exact: false},
    {to: '/logout', label: 'Выйти', exact: false}
  ] : [
    {to: '/', label: 'Список тестов', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
  ];

  const cls=[
    classes.MenuList,
  ];

  if (!isOpen) {
    cls.push(classes.close)
  };

  return (
    <>
      <nav className={cn(cls.join(' '))}>
        <ul>
          { links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                exact={link.exact}
                activeClassName={classes.active}
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </li>
          )) }
        </ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose}/> : null}
    </>
  )
};

export { MenuList };