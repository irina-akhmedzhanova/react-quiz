import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionsTypes';

export function auth(email, password, isLogin) {

  return async dispatch => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const URL = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5Lh1Sa6raVsBWh3DChx01CKetyFMj2lk'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5Lh1Sa6raVsBWh3DChx01CKetyFMj2lk';

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(authData)
      });

      const data = await response.json();
      console.log(data);
      const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));

    } catch (e) {
      console.log(e)
    }
  }
};

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time*1000)
  }
};

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
};

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS, 
  token
});

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000))
      }
    }
  }
};

