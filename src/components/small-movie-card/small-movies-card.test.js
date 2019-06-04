import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";
import card from "../../mocks/movie-card";

it(`SmallMovieCard correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard card={card}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
