import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

it(`VideoPlayer correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <VideoPlayer
          src="src/path"
          title="title"
          poster="poster/path"
          onExit={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
