import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`SignIn correctly renders default markup`, () => {
  const tree = renderer.create(
      <SignIn
        className="class-name"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
