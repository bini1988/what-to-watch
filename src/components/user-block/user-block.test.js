import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import user from "../../mocks/user";


it(`UserBlock correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        nitialEntries = {[`/`]}>
        <UserBlock user={user}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders signin markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        nitialEntries = {[`/`]}>
        <UserBlock/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
