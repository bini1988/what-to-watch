import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

it(`SmallMovieCard correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          card={{
            id: 11,
            title: `Movie Title`,
            genre: `Movie Genre`,
            img: `img/path`,
            trailer: `trailer/path`,
          }}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
