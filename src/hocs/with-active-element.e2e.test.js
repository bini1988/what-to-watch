import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveElement from "./with-active-element";

configure({adapter: new Adapter()});

jest.useFakeTimers();

function MockComponent() {
  return <div />;
}

describe(`withActiveElement`, () => {
  it(`should change activeElement prop with set and reset handlers`, () => {
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

    component.prop(`resetActiveElement`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`activeElement`)).toBeUndefined();
  });
});
