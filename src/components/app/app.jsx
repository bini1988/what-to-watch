import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import withLoadable from "react-loadable";

import {Operation} from "../../reducer/user/user";
import withRouteAuth from "../../hocs/with-route-auth";

import Loading from "../loading/loading";
import MainPage from "../main-page/main-page";

const AuthRoute = withRouteAuth(Route);
const withLoader = (loader) => withLoadable({loader, loading: Loading});

const SignInPage = withLoader(() => import(/* webpackChunkName: "sign-in" */`../sign-in-page/sign-in-page`));
const MyListPage = withLoader(() => import(/* webpackChunkName: "my-list" */`../my-list-page/my-list-page`));
const AddReviewPage = withLoader(() => import(/* webpackChunkName: "add-review" */`../add-review-page/add-review-page`));
const MoviePage = withLoader(() => import(/* webpackChunkName: "movie" */`../movie-page/movie-page`));
const VideoPlayerPage = withLoader(() => import(/* webpackChunkName: "video-player" */`../video-player-page/video-player-page`));


class AppView extends PureComponent {
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

AppView.propTypes = {
  /** Авторизован ли текущий пользователь */
  onAuthCheck: PropTypes.func,
};

const mapDispatchToProps = {
  onAuthCheck: Operation.echoUser,
};
const App = connect(null, mapDispatchToProps)(AppView);

export {AppView};
export default App;
