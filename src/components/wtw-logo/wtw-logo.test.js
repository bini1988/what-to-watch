import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import WTWLogo from "./wtw-logo.jsx";

it(`WTWLogo correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        nitialEntries = {[`/`]}>
        <WTWLogo/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`WTWLogo correctly renders light markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        nitialEntries = {[`/`]}>
        <WTWLogo mode="light"/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
