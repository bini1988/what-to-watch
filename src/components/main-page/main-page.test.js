import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import genreGroupsMock from "../../mocks/movies-groups";

it(`MainPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MainPage
        moviesGenreGroups={genreGroupsMock}
        activeGenre="All Genres"
        onGenreChange={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
