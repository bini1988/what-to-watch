import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {isAuthorizationRequired} from "../../reducer/user/selectors";
import {loadMovies} from "../../reducer/catalog/catalog";

import MainPage from "../main-page/main-page";
import SignInPage from "../sign-in-page/sign-in-page";

export class App extends PureComponent {
  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    return this.props.isAuthorizationRequired ? (
      <SignInPage/>
    ) : (
      <MainPage/>
    );
  }
}

App.defaultProps = {
  loadMovies: () => {},
};
App.propTypes = {
  /** Необходима авторизация пользователя */
  isAuthorizationRequired: PropTypes.bool,
  /** Получить полный список фильмов */
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: isAuthorizationRequired(state)
  };
};

export default connect(mapStateToProps, {loadMovies})(App);
