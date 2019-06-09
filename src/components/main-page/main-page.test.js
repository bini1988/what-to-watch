import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import genreGroupsMock from "../../mocks/movies-groups";
import promoMovie from "../../mocks/movie-card";

it(`MainPage correctly renders default markup`, () => {
  const tree = renderer.create(
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
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
