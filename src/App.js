import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from './hoc/Layout/Layout';
import { Quiz } from './containers/Quiz/Quiz';
import { Auth } from './containers/Auth/Auth';
import { QuizCreator } from './containers/QuizCreator/QuizCreator';
import { QuizList } from './containers/QuizList/QuizList';
import { Logout } from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth';


function AppWithoutConnect({autoLogin, isAuthenticated}) {
  useEffect(() => {
    autoLogin()
  }, []);
  const routes = isAuthenticated
    ? (
      <Switch>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exaxt component={QuizList} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exaxt component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

  return (
    <Layout>
      {routes}
    </Layout>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
});

const mapDispatchToprops = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin())
});

const App = withRouter(connect(mapStateToProps, mapDispatchToprops)(AppWithoutConnect))

export { App };