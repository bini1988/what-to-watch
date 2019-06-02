import React from "react";
import renderer from "react-test-renderer";
import PageHeader from "./page-header.jsx";

it(`PageHeader correctly renders default markup`, () => {
  const tree = renderer.create(<PageHeader/>).toJSON();
  expect(tree).toMatchSnapshot();
});
