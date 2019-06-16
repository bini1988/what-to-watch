import React from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page";
import card from "../../mocks/movie-card";

const initialState = {};
const mockStore = configureStore();

it(`MoviePage correctly renders default markup`, () => {
  const tree = renderer.create(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviePage
            movie={card}
            onMovieFetch={() => {}}
            onMovieReviewsFetch={() => {}}/>
        </MemoryRouter>
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
