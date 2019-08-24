import React from "react";
import renderer from "react-test-renderer";
import Loading from "./loading";

it(`Loading correctly renders default markup`, () => {
  const tree = renderer.create(
      <Loading/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
