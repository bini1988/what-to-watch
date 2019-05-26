import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

it(`VideoPlayer correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <VideoPlayer/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
