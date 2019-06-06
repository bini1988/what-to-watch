import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`SignIn correctly renders default markup`, () => {
  const tree = renderer.create(
      <SignIn
        className="class-name"
        message="We can’t recognize this email and password combination. Please try again."/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
