import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

it(`SmallMovieCard correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          card={{
            id: `b15a1da5-8142-4d2a-b567-26599e333988`,
            title: `Movie Title`,
            img: `img/path`,
          }}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
