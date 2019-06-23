import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview";
import card from "../../../mocks/movie-card";

it(`MovieOverview correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieOverview card={card}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
