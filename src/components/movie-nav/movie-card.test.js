import React from "react";
import renderer from "react-test-renderer";
import MovieNav from "./movie-nav";

it(`MovieNav correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieNav>
        <MovieNav.Item label="item-1" href="href-1"/>
        <MovieNav.Item label="item-2" href="href-2"/>
        <MovieNav.Item label="item-3" href="href-3"/>
      </MovieNav>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
