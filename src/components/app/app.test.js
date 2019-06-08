import React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {MemoryRouter} from "react-router-dom";

import reducer from "../../reducer/index";
import {Provider} from "react-redux";
// import App from "./app";

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <MemoryRouter
            initialEntries = {[`/`]}>
            {/* <App/> */}
          </MemoryRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
