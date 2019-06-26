import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SignInPageView} from "./sign-in-page";
import SignIn from "../sign-in/sign-in";

configure({adapter: new Adapter()});

describe(`SignInPageView`, () => {
  it(`Should call onUserLogin handler`, () => {
    const user = {id: 7};
    const location = {state: {referrer: `/mylist`}};
    const handlePush = jest.fn();
    const handleonUserLogin = jest.fn(() => Promise.resolve());
    const wrapper = shallow(
        <SignInPageView
          location={location}
          hasAuth={false}
          history={{push: handlePush}}
          onUserLogin={handleonUserLogin}/>
    );

    const component = wrapper.find(SignIn);

    return component.prop(`onSubmit`)(user)
      .then(() => {
        expect(handleonUserLogin).toHaveBeenCalledWith(user);
        expect(handlePush).toHaveBeenCalledWith(location.state.referrer);
      });
  });
});
