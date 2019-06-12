import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {VideoPlayerPage} from "./video-player-page";

it(`VideoPlayerPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <VideoPlayerPage/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
