import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews";
import reviews from "../../../mocks/reviews";

it(`MovieReviews correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieReviews reviews={reviews}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
