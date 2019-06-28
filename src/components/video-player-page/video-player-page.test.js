import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import card from "../../mocks/movie-card";
import {VideoPlayerPageView} from "./video-player-page";

it(`VideoPlayerPageView correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <VideoPlayerPageView
          movie={card}
          onMovieFetch={() => {}}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
