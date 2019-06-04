import React from "react";
import renderer from "react-test-renderer";
import WTWLogo from "./wtw-logo.jsx";

it(`WTWLogo correctly renders default markup`, () => {
  const tree = renderer.create(<WTWLogo/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`WTWLogo correctly renders light markup`, () => {
  const tree = renderer.create(<WTWLogo mode="light"/>).toJSON();
  expect(tree).toMatchSnapshot();
});
