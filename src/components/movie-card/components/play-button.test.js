import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import PlayButton from "./play-button";
import card from "../../../mocks/movie-card";

it(`PlayButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <PlayButton card={card}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
