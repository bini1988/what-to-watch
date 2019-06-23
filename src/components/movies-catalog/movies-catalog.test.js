import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";
import genreGroupsMock from "../../mocks/movies-genres";

const moviesGenres = Object.keys(genreGroupsMock);
const activeGenre = moviesGenres[0];
const movies = genreGroupsMock[activeGenre];

it(`MoviesCatalog correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            movies={movies}
            moviesGenres={moviesGenres}
            activeGenre={activeGenre}
            onGenreChange={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviesCatalog correctly renders markup in likeThis mode`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            likeThis={true}
            title="More like this"
            movies={movies.slice(0, 4)}
            onGenreChange={() => {}}
            onMoviesMore={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviesCatalog correctly renders more button if limit less than movies count`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            limit={Math.min(1, movies.length - 3)}
            movies={movies}
            moviesGenres={moviesGenres}
            activeGenre={activeGenre}
            onGenreChange={() => {}}
            onMoviesMore={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviesCatalog correctly renders default markup if limit more or equal to movies count`, () => {
  const tree = renderer
    .create(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            limit={movies.length}
            movies={movies}
            moviesGenres={moviesGenres}
            activeGenre={activeGenre}
            onGenreChange={() => {}}
            onMoviesMore={() => {}}/>
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

