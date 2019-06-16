import React from "react";
import renderer from "react-test-renderer";
import Poster from "./poster";
import card from "../../../mocks/movie-card";

it(`Poster correctly renders default markup`, () => {
  const tree = renderer.create(
      <Poster card={card}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`Poster correctly renders small mode markup`, () => {
  const tree = renderer.create(
      <Poster card={card} mode="small"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`Poster correctly renders big mode markup`, () => {
  const tree = renderer.create(
      <Poster card={card} mode="big"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
