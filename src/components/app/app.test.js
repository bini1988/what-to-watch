import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import genreGroupsMock from "../../mocks/movies-groups";

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <App
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
