import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";
import genreGroupsMock from "../../mocks/movies-groups";

it(`MoviesCatalog correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            movies={genreGroupsMock[`All Genres`]}
            moviesGenres={Object.keys(genreGroupsMock)}
            activeGenre="All Genres"
            onGenreChange={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviesCatalog correctly renders default markup with more button`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            movies={genreGroupsMock[`All Genres`]}
            moviesGenres={Object.keys(genreGroupsMock)}
            activeGenre="All Genres"
            onGenreChange={() => {}}
            onMoviesMore={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
