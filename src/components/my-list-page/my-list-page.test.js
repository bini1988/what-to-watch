import React from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import genreGroupsMock from "../../mocks/movies-groups";
import {MyListPage} from "./my-list-page";

const initialState = {};
const mockStore = configureStore();

it(`MyListPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MyListPage
            moviesGenreGroups={genreGroupsMock}
            myListMovies={[]}
            fetchMovies={() => {}}
            fetchMyListMovies={() => {}}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
