import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReviewPage} from "./add-review-page";
import AddReview from "../add-review/add-review";

configure({adapter: new Adapter()});

describe(`AddReviewPage`, () => {
  it(`Should call onReviewSubmit handler`, () => {
    const review = {comment: `comment`, rating: 5};
    const id = 7;
    const handlePush = jest.fn();
    const handleOnReviewSubmit = jest.fn(() => Promise.resolve());
    const wrapper = shallow(
        <AddReviewPage
          movie={{id}}
          history={{push: handlePush}}
          onReviewSubmit={handleOnReviewSubmit}/>
    );

    const component = wrapper.find(AddReview);

    return component.prop(`onSubmit`)(review)
      .then(() => {
        expect(handleOnReviewSubmit).toHaveBeenCalledWith(id, review);
        expect(handlePush).toHaveBeenCalledWith(`/film/${id}#Reviews`);
      });
  });
});
