import React from "react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {AddReviewPageView} from "./add-review-page";
import card from "../../mocks/movie-card";

const initialState = {};
const mockStore = configureStore();

it(`AddReviewPageView correctly renders default markup`, () => {
  const tree = renderer.create(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter
          initialEntries = {[`/`]}>
          <AddReviewPageView
            movie={card}
            onReviewSubmit={() => {}}/>
        </MemoryRouter>
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
