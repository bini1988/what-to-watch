import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Breadcrumbs from "./breadcrumbs";

it(`Breadcrumbs correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <Breadcrumbs>
          <Breadcrumbs.Item
            label="The Grand Budapest Hotel"
            href="/film/:id"/>
          <Breadcrumbs.Item
            label="Add review"/>
        </Breadcrumbs>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
