import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";
import review from "../../mocks/review";

it(`Review correctly renders default markup`, () => {
  const tree = renderer.create(
      <Review review={review}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
