import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews";
import card from "../../../mocks/movie-card";
import reviews from "../../../mocks/reviews";

it(`MovieReviews correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieReviews card={{...card, reviews}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
