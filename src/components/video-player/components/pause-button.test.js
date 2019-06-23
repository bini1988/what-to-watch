import React from "react";
import renderer from "react-test-renderer";
import PauseButton from "./pause-button";

it(`PauseButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <PauseButton onClick={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
