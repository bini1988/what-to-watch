import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import genreGroupsMock from "../../mocks/movies-groups";

it(`MainPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <MainPage
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onGenreChange={() => {}}
          fetchMovies={() => {}}
          fetchPromoMovie={() => {}}
        />
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
