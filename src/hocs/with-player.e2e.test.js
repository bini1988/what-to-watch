import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayer from "./with-player";

configure({adapter: new Adapter()});

jest.useFakeTimers();

function MockComponent() {
  return <div />;
}

describe(`withPlayer`, () => {
  it(`should set isPlayerPlaying prop and call play with Play handler`, () => {
    HTMLVideoElement.prototype.play = jest.fn();

    const WrappedMockComponent = withPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();
    component.prop(`onPlayerPlay`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(true);
    expect(HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);

    HTMLVideoElement.prototype.play.mockRestore();
  });
  it(`should reset isPlayerPlaying prop and and call load with Pause handler`, () => {
    HTMLVideoElement.prototype.play = jest.fn();
    HTMLVideoElement.prototype.load = jest.fn();

    const WrappedMockComponent = withPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();
    component.prop(`onPlayerPlay`)();
    wrapper.update();

    component.prop(`onPlayerPause`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);
    expect(HTMLVideoElement.prototype.load).toHaveBeenCalledTimes(1);

    HTMLVideoElement.prototype.play.mockRestore();
    HTMLVideoElement.prototype.load.mockRestore();
  });
  it(`should change isPlayerPlaying prop with Play after timeout`, () => {
    const WrappedMockComponent = withPlayer({autoPlayTimeout: 1000})(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    component.prop(`onPlayerPlay`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    component.prop(`onPlayerPlay`)();
    jest.runAllTimers();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(true);
  });
  it(`should return audio on renderPlayer method call`, () => {
    const WrappedMockComponent = withPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );
    const props = {src: `trailer`, poster: `poster`, muted: true};

    const renderWrapper = wrapper.find(MockComponent).renderProp(`renderPlayer`)(props);
    const playerWrapper = renderWrapper.children();

    expect(playerWrapper.type()).toEqual(`video`);
    expect(playerWrapper.props()).toMatchObject(props);
  });
});
