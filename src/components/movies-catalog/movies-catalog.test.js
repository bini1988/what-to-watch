import React from "react";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";

const genreGroupsMock = {
  "All Genres": [
    {
      id: 11,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    }, {
      id: 22,
      title: `Bohemian Rhapsody`,
      img: `img/bohemian-rhapsody.jpg`,
    }
  ]};

it(`MoviesCatalog correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onGenreChange={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
