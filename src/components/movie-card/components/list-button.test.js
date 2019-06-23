import React from "react";
import renderer from "react-test-renderer";
import ListButton from "./list-button";
import card from "../../../mocks/movie-card";

const Nop = () => {};

it(`ListButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <ListButton
        card={card}
        onToMyListAdd={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`ListButton correctly renders in list markup`, () => {
  const tree = renderer.create(
      <ListButton
        card={{...card, isInList: true}}
        onToMyListAdd={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
