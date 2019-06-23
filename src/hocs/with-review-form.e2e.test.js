import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withReviewForm from "./with-review-form";

configure({adapter: new Adapter()});

function MockComponent() {
  return <div />;
}

describe(`withReviewForm`, () => {
  it(`should change rating prop value by onRatingChange handler`, () => {
    const ratingValue = 5;
    const WrappedMockComponent = withReviewForm(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    component.prop(`onRatingChange`)(ratingValue);
    wrapper.update();

    component = wrapper.find(MockComponent);

    expect(component.prop(`rating`)).toEqual(ratingValue);
  });
  it(`should change comment prop value by onCommentChange handler`, () => {
    const commentValue = `some comment text`;
    const WrappedMockComponent = withReviewForm(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    component.prop(`onCommentChange`)(commentValue);
    wrapper.update();

    component = wrapper.find(MockComponent);

    expect(component.prop(`comment`)).toEqual(commentValue);
  });
  it(`should submit form by handleSubmit handler`, () => {
    const form = {rating: 4.5, comment: `good comment`};
    const handleSubmit = jest.fn();
    const WrappedMockComponent = withReviewForm(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent
          onSubmit={handleSubmit}/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    component.prop(`onRatingChange`)(form.rating);
    component.prop(`onCommentChange`)(form.comment);
    component.prop(`handleSubmit`)();
    wrapper.update();

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(form);
  });
  it(`should set invalid prop`, () => {

  });
});
