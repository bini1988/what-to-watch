import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

configure({adapter: new Adapter()});

describe(`SignIn`, () => {
  it(`Should call onSubmit handler`, () => {
    const formData = {email: `email`, password: `123`};
    const handleSubmit = jest.fn();
    const handlePreventDefault = jest.fn();
    const wrapper = mount(
        <SignIn onSubmit={handleSubmit}/>
    );

    const form = wrapper.find(`.sign-in__form`);
    expect(form).toHaveLength(1);

    const event = {
      preventDefault: handlePreventDefault,
      target: form.at(0).getDOMNode()
    };

    const emailInput = wrapper.find(`.sign-in__input[id='user-email']`);
    emailInput.at(0).instance().value = formData.email;
    const passwordInput = wrapper.find(`.sign-in__input[id='user-password']`);
    passwordInput.at(0).instance().value = formData.password;

    form.simulate(`submit`, event);
    form.update();

    expect(handlePreventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith(formData);
  });
});
