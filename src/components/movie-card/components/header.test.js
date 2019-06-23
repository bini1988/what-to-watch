import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import card from "../../../mocks/movie-card";

it(`Header correctly renders default markup`, () => {
  const tree = renderer.create(
      <Header
        className="new-class"
        card={card}>
        {`Childs elements`}
      </Header>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`Header correctly renders markup with component prop`, () => {
  const Component = (props) => (
    <div {...props}/>
  );
  const tree = renderer.create(
      <Header
        className="new-class"
        card={card}
        component={Component}>
        {`Childs elements`}
      </Header>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
