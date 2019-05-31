import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveElement from "./with-active-element";

configure({adapter: new Adapter()});

function MockComponent() {
  return <div />;
}

describe(`withActiveElement`, () => {
  it(`should set activeElement prop with setActiveElement handler`, () => {
    const WrappedMockComponent = withActiveElement(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const element = {data: `data`};
    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`activeElement`)).toBeUndefined();

    component.prop(`setActiveElement`)(element);
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`activeElement`)).toEqual(element);
  });
  it(`should reset activeElement prop with resetActiveElement handler`, () => {
    const WrappedMockComponent = withActiveElement(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const element = {data: `data`};
    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`activeElement`)).toBeUndefined();

    component.prop(`setActiveElement`)(element);
    wrapper.update();

    component = wrapper.find(MockComponent);
    component.prop(`resetActiveElement`)();
    wrapper.update();
    component = wrapper.find(MockComponent);

    expect(component.prop(`activeElement`)).toBeUndefined();
  });
});
