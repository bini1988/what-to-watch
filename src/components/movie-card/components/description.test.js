import React from "react";
import renderer from "react-test-renderer";
import Description from "./description";
import card from "../../../mocks/movie-card";

it(`Description correctly renders default markup`, () => {
  const tree = renderer.create(
      <Description card={card}>
        {`Childs elements`}
      </Description>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
