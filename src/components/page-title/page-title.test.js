import React from "react";
import renderer from "react-test-renderer";
import PageTitle from "./page-title.jsx";

it(`PageTitle correctly renders default markup`, () => {
  const tree = renderer.create(
      <PageTitle
        className="title-class">
        {`Page Title`}
      </PageTitle>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`PageTitle correctly renders hidden mode markup`, () => {
  const tree = renderer.create(
      <PageTitle
        className="title-class"
        hidden={true}>
        {`Page Title`}
      </PageTitle>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
