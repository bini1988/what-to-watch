import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";
import reviews from "../../mocks/reviews";

it(`Review correctly renders default markup`, () => {
  const tree = renderer.create(
      <Review review={reviews[0]}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
