import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";

it(`UserBlock correctly renders default markup`, () => {
  const tree = renderer.create(
      <UserBlock
        user={{
          name: `User`,
          avatar: `/avatar.jpg`,
        }}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
