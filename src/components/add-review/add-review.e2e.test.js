import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";

configure({adapter: new Adapter()});

describe(`AddReview`, () => {
  it(`Should call onSubmit handler`, () => {
    const maxRating = 5;
    const handleSubmit = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = mount(
        <AddReview
          maxRating={maxRating}
          onSubmit={handleSubmit}/>
    );

    for (let rating = 1; rating <= maxRating; rating++) {
      const ratingInput = wrapper.find(`.rating__input[id='star-${rating}']`);
      ratingInput.at(0).instance().checked = true;

      const comment = `some text`;
      const textInput = wrapper.find(`.add-review__textarea`);
      textInput.at(0).instance().value = comment;

      const form = wrapper.find(`.add-review__form`);
      const target = form.at(0).getDOMNode();

      form.simulate(`submit`, {preventDefault, target});

      expect(preventDefault).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith({rating, comment});
    }
  });
});
