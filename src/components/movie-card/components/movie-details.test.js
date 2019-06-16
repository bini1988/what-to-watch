import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details";
import card from "../../../mocks/movie-card";

it(`MovieDetails correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieDetails card={card}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
