import React from "react";
import renderer from "react-test-renderer";
import MovieRating from "./movie-rating";

it(`MovieRating correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieRating rating={{
        score: 8.5,
        level: `Good`,
        count: 666,
      }}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
