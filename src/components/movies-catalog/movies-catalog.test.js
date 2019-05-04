import React from "react";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";

it(`MoviesCatalog correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <MoviesCatalog items={[
          `Movie Title #0`,
          `Movie Title #1`,
          `Movie Title #2`,
        ]}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
