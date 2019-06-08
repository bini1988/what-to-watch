import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import genreGroupsMock from "../../mocks/movies-groups";
import {MyListPage} from "./my-list-page";

it(`MyListPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <MyListPage
          moviesGenreGroups={genreGroupsMock}
          myListMovies={[]}
          fetchMovies={() => {}}
          fetchMyListMovies={() => {}}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
