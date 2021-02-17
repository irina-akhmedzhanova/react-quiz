import { useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

function LogoutWithoutConnect({logout}) {
  useEffect(() => {
    logout()
  });

  return <Redirect to={'/'} />
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

const Logout = connect(null, mapDispatchToProps)(LogoutWithoutConnect);

export { Logout };