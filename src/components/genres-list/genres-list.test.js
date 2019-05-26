import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

it(`GenresList correctly renders default markup`, () => {
  const moviesMock = [`Drama`, `Comedy`];
  const tree = renderer
    .create(
        <GenresList
          genres={moviesMock}
          activeGenre="All genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
