import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Breadcrumbs from "./breadcrumbs";
import card from "../../../mocks/movie-card";

it(`Breadcrumbs correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <Breadcrumbs card={card}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
