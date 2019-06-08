import React from "react";
import renderer from "react-test-renderer";
import Button from "./button";

const Nop = () => {};

it(`Button correctly renders default markup`, () => {
  const tree = renderer.create(
      <Button label="btn label" onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Button correctly renders play mode markup`, () => {
  const tree = renderer.create(
      <Button label="btn label" mode="play" onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Button correctly renders list mode markup`, () => {
  const tree = renderer.create(
      <Button label="btn label" mode="list" onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Button correctly renders inlist mode markup`, () => {
  const tree = renderer.create(
      <Button label="btn label" mode="inlist" onClick={Nop}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
