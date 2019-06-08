import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page";

it(`MoviePage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <MoviePage/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
