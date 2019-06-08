import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import PageFooter from "./page-footer.jsx";

it(`PageFooter correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <PageFooter/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
