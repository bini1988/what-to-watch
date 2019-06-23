import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {createApi} from "../../api";

import {Provider} from "react-redux";
import App from "./app";

const api = createApi({onError: () => {}});

const middlewares = [thunk.withExtraArgument(api)];
const createMockStore = configureStore(middlewares);
const mockStore = createMockStore();

it(`App correctly renders main page markup`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <App/>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

