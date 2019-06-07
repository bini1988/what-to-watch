import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {AddReviewPage} from "./add-review-page";
import user from "../../mocks/user";

it(`AddReviewPage correctly renders default markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <AddReviewPage
          user={user}
          onSubmit={() => {}}/>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
