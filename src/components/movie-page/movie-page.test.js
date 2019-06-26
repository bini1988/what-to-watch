import React from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {MoviePageView} from "./movie-page";
import movies from "../../mocks/movies";
import card from "../../mocks/movie-card";
import reviews from "../../mocks/reviews";

const initialState = {};
const mockStore = configureStore();

it(`MoviePageView correctly renders default markup`, () => {
  const tree = renderer.create(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviePageView
            movie={card}
            movies={movies}
            reviews={reviews}
            onMovieFetch={() => {}}
            onMovieReviewsFetch={() => {}}
            onToMyListToggle={() => {}}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
