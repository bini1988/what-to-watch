import React from "react";
import renderer from "react-test-renderer";
import PlayButton from "./play-button";

it(`PlayButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <PlayButton onClick={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
