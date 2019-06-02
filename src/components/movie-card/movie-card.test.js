import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import card from "../../mocks/movie-card";

it(`MovieCard correctly renders default markup`, () => {
  const tree = renderer.create(<MovieCard card={card}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
