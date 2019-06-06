import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import PageHeader from "./page-header.jsx";

it(`PageHeader correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <PageHeader/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
