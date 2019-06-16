import React from "react";
import renderer from "react-test-renderer";
import InfoWrapper from "./info-wrapper";

it(`InfoWrapper correctly renders default markup`, () => {
  const tree = renderer.create(
      <InfoWrapper className="new-class">
        {`Childs elements`}
      </InfoWrapper>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it(`InfoWrapper correctly renders translate markup`, () => {
  const tree = renderer.create(
      <InfoWrapper className="new-class" translate>
        {`Childs elements`}
      </InfoWrapper>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
