import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import user from "../../mocks/user";


it(`UserBlock correctly renders default markup`, () => {
  const tree = renderer.create(
      <UserBlock user={user}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders signin markup`, () => {
  const tree = renderer.create(
      <UserBlock/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
