import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../reducer/user/user";
import PageTitle from "../page-title/page-title";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import SignIn from "../sign-in/sign-in";

function SignInPage({onUserLogin}) {
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
        onSubmit={onUserLogin}/>
      <PageFooter/>
    </div>
  );
}

SignInPage.propTypes = {
  /** Авторизовать пользователя */
  onUserLogin: PropTypes.func.isRequired,
};

export {SignInPage};
export default connect(null, {onUserLogin: loginUser})(SignInPage);
