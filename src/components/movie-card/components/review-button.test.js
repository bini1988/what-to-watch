import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import ReviewButton from "./review-button";
import card from "../../../mocks/movie-card";

it(`ReviewButton correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <ReviewButton card={card}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
