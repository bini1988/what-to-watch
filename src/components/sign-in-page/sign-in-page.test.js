import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {SignInPage} from "./sign-in-page";

it(`SignInPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <SignInPage
          onUserLogin={() => {}}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
