import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list";

it(`GenresList correctly renders default markup`, () => {
  const genres = [`Drama`, `Comedy`];
  const tree = renderer
    .create(
        <GenresList
          genres={genres}
          activeGenre="All genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`GenresList correctly renders empty genres list`, () => {
  const tree = renderer
    .create(
        <GenresList
          genres={[]}
          activeGenre="All genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
