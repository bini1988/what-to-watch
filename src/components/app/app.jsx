import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import {Operation} from "../../reducer/user/user";
import withRouteAuth from "../../hocs/with-route-auth";

import MainPage from "../main-page/main-page";
import SignInPage from "../sign-in-page/sign-in-page";
import MyListPage from "../my-list-page/my-list-page";
import AddReviewPage from "../add-review-page/add-review-page";
import MoviePage from "../movie-page/movie-page";
import VideoPlayerPage from "../video-player-page/video-player-page";

const AuthRoute = withRouteAuth(Route);

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            component={MainPage}/>
          <Route
            path="/login"
            component={SignInPage}/>
          <AuthRoute
            path="/mylist"
            component={MyListPage}/>
          <Route
            path="/film/:id"
            exact={true}
            component={MoviePage}/>
          <AuthRoute
            path="/film/:id/review"
            component={AddReviewPage}/>
          <Route
            path="/film/:id/player"
            component={VideoPlayerPage}/>
          <Route
            render={() => <Redirect to="/"/>}/>
        </Switch>
      </BrowserRouter>
    );
  }

  componentDidMount() {
    this.props.onAuthCheck();
  }
}

App.propTypes = {
  /** Авторизован ли текущий пользователь */
  onAuthCheck: PropTypes.func,
};

const mapDispatchToProps = {
  onAuthCheck: Operation.echoUser,
};

export {App};
export default connect(null, mapDispatchToProps)(App);
