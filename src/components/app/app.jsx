import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import MainPage from "../main-page/main-page";
import SignInPage from "../sign-in-page/sign-in-page";
import MyListPage from "../my-list-page/my-list-page";
import AddReviewPage from "../add-review-page/add-review-page";
import MoviePage from "../movie-page/movie-page";

function App() {
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
        <Route
          path="/mylist"
          component={MyListPage}/>
        <Route
          path="/film/:id"
          exact={true}
          component={MoviePage}/>
        <Route
          path="/film/:id/review"
          component={AddReviewPage}/>
        <Route
          render={() => <Redirect to="/"/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
