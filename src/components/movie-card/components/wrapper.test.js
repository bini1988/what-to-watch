import React from "react";
import renderer from "react-test-renderer";
import Wrapper from "./wrapper";

it(`Wrapper correctly renders default markup`, () => {
  const tree = renderer.create(
      <Wrapper className="new-class">
        {`Childs elements`}
      </Wrapper>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`Wrapper correctly renders main markup`, () => {
  const tree = renderer.create(
      <Wrapper className="new-class" main>
        {`Childs elements`}
      </Wrapper>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
