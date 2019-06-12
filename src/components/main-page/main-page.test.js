import React from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import genreGroupsMock from "../../mocks/movies-groups";
import promoMovie from "../../mocks/movie-card";

const initialState = {};
const mockStore = configureStore();

it(`MainPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MainPage
            promoMovie={promoMovie}
            movies={genreGroupsMock[`All Genres`]}
            moviesGenres={Object.keys(genreGroupsMock)}
            onGenreChange={() => {}}
            fetchMovies={() => {}}
            fetchPromoMovie={() => {}}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
