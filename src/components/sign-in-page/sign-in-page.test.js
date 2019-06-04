import React from "react";
import renderer from "react-test-renderer";
import {SignInPage} from "./sign-in-page";

it(`SignInPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <SignInPage onUserLogin={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
