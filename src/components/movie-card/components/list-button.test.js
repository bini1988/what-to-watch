import React from "react";
import renderer from "react-test-renderer";
import ListButton from "./list-button";
import card from "../../../mocks/movie-card";

const Nop = () => {};

it(`ListButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <ListButton
        card={card}
        onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`ListButton correctly renders in list markup`, () => {
  const tree = renderer.create(
      <ListButton
        card={{...card, isInList: true}}
        onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
