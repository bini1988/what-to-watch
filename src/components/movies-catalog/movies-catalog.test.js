import React from "react";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";
import genreGroupsMock from "../../mocks/movies-groups";

it(`MoviesCatalog correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviesCatalog correctly renders default markup with more button`, () => {
  const tree = renderer
    .create(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onGenreChange={() => {}}
          onMoviesMore={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
