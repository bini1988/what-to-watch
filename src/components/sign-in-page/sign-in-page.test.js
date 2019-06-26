import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {SignInPageView} from "./sign-in-page";

it(`SignInPageView correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <SignInPageView
          location={{state: {referrer: `/mylist`}}}
          hasAuth={false}
          history={{}}
          onUserLogin={() => {}}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
