import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation} from "../../reducer/user/user";
import {getAuthError} from "../../reducer/user/selectors";

import PageTitle from "../page-title/page-title";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import SignIn from "../sign-in/sign-in";

function SignInPage({error, onUserLogin, location, history}) {
  const {state} = location;
  const handleSubmit = (user) => {
    return onUserLogin(user).then(() => {
      if (state && state.referrer) {
        history.push(state.referrer);
      }
    });
  };

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

SignInPage.propTypes = {
  /** Объект location React-Router */
  location: PropTypes.object.isRequired,
  /** Объект history React-Router */
  history: PropTypes.object.isRequired,
  /** Ошибка авторизации пользователя */
  error: PropTypes.string,
  /** Авторизовать пользователя */
  onUserLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: getAuthError(state),
  };
};
const mapDispatchToProps = {
  onUserLogin: Operation.loginUser,
};

export {SignInPage};
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
