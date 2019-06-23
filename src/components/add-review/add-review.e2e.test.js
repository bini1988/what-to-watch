import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReview} from "./add-review";

configure({adapter: new Adapter()});

describe(`AddReview`, () => {
  it(`Should call handleSubmit handler`, () => {
    const handleSubmit = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = mount(
        <AddReview
          onSubmit={handleSubmit}/>
    );

    const form = wrapper.find(`.add-review__form`);
    const target = form.at(0).getDOMNode();

    form.simulate(`submit`, {preventDefault, target});

    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });
  it(`Should call onRatingChange handler`, () => {
    const handleRatingChange = jest.fn();
    const wrapper = mount(
        <AddReview
          onRatingChange={handleRatingChange}/>
    );

    const maxRating = 5;

    for (let rating = 1; rating <= maxRating; rating++) {
      const ratingInput = wrapper.find(
          `.rating__input[id='star-${rating}']`
      );

      ratingInput.simulate(`change`);

      expect(handleRatingChange).toHaveBeenCalledWith(rating);
    }
    expect(handleRatingChange).toHaveBeenCalledTimes(maxRating);
  });
  it(`Should call onCommentChange handler`, () => {
    const handleCommentChange = jest.fn();
    const wrapper = mount(
        <AddReview
          onCommentChange={handleCommentChange}/>
    );

    const value = `comment value`;
    const textarea = wrapper.find(`.add-review__textarea`);
    const target = {value};

    textarea.simulate(`change`, {target});

    expect(handleCommentChange).toHaveBeenCalledTimes(1);
    expect(handleCommentChange).toHaveBeenCalledWith(value);
  });
});
