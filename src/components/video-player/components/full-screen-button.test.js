import React from "react";
import renderer from "react-test-renderer";
import FullScreenButton from "./full-screen-button";

it(`FullScreenButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <FullScreenButton onClick={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
