import React from "react";
import {Redirect} from "react-router-dom";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withRouteAuth} from "./with-route-auth";

configure({adapter: new Adapter()});

function MockComponent() {
  return <div />;
}

describe(`withRouteAuth`, () => {
  it(`should render wrapped component`, () => {
    const props = {a: `1`, b: `2`};
    const WrappedMockComponent = withRouteAuth(MockComponent);
    const wrapper = shallow(
        <WrappedMockComponent hasAuth={true} {...props}/>
    );

    expect(wrapper.find(MockComponent)).toHaveLength(1);
    expect(wrapper.find(MockComponent).props()).toEqual(props);
  });
  it(`should render Redirect component`, () => {
    const location = {pathname: `path/to/redirect`};
    const to = {pathname: `/login`, state: {referrer: location.pathname}};
    const WrappedMockComponent = withRouteAuth(MockComponent);
    const wrapper = shallow(
        <WrappedMockComponent
          location={location}
          hasAuth={false}/>
    );

    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop(`to`)).toEqual(to);
  });
});
