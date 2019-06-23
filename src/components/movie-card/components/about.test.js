import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import About from "./about";
import card from "../../../mocks/movie-card";
import reviews from "../../../mocks/reviews";

it(`About correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <About card={card}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`About correctly renders Details tab markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <About card={card} tab="Details"/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`About correctly renders Reviews tab markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <About card={card} tab="Reviews" reviews={reviews}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
