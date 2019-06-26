import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {Operation} from "../../reducer/user/user";
import {getAuthError, isAuthenticated} from "../../reducer/user/selectors";

import PageTitle from "../page-title/page-title";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import SignIn from "../sign-in/sign-in";

function SignInPageView({hasAuth, error, onUserLogin, location, history}) {
  const {state} = location;
  const handleSubmit = (user) => {
    return onUserLogin(user).then(() => {
      if (state && state.referrer) {
        history.push(state.referrer);
      }
    }).catch(() => {});
  };

  if (hasAuth) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
    <div className="user-page">
      <PageHeader
        className="user-page__head">
        <PageTitle
          className="user-page__title">
          {`Sign in`}
        </PageTitle>
      </PageHeader>
      <SignIn
        className="user-page__content"
        message={error}
        onSubmit={handleSubmit}/>
      <PageFooter/>
    </div>
  );
}

SignInPageView.propTypes = {
  /** Объект location React-Router */
  location: PropTypes.shape({
    state: PropTypes.shape({
      referrer: PropTypes.string,
    }),
  }),
  /** Объект history React-Router */
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  /** Авторизован ли текущий пользователь */
  hasAuth: PropTypes.bool,
  /** Ошибка авторизации пользователя */
  error: PropTypes.string,
  /** Авторизовать пользователя */
  onUserLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: getAuthError(state),
    hasAuth: isAuthenticated(state),
  };
};
const mapDispatchToProps = {
  onUserLogin: Operation.loginUser,
};
const SignInPage = connect(mapStateToProps, mapDispatchToProps)(SignInPageView);

export {SignInPageView};
export default SignInPage;
