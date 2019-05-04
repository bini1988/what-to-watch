import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

it(`SmallMovieCard correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          title="Movie Title"/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
