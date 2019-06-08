import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review";

it(`AddReview correctly renders default markup`, () => {
  const tree = renderer.create(
      <AddReview
        maxRating={5}
        onSubmit={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
