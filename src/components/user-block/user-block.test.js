import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {UserBlockView} from "./user-block.jsx";
import user from "../../mocks/user";


it(`UserBlockView correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <UserBlockView user={user}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlockView correctly renders signin markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <UserBlockView/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
