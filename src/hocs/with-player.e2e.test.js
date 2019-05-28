import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayer from "./with-player";
import VideoPlayer from "../components/video-player/video-player.jsx";

configure({adapter: new Adapter()});

jest.useFakeTimers();

function MockComponent() {
  return <div />;
}

describe(`withPlayer`, () => {
  it(`should change isPlayerPlaying prop with Play and Pause handlers`, () => {
    const WrappedMockComponent = withPlayer(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    component.prop(`onPlayerPlay`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(true);

    component.prop(`onPlayerPause`)();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);
  });
  it(`should change isPlayerPlaying prop with Play after timeout`, () => {
    const WrappedMockComponent = withPlayer(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    component.prop(`onPlayerPlay`)(1000);
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    component.prop(`onPlayerPlay`)(1000);
    jest.runAllTimers();
    wrapper.update();
    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(true);
  });
  it(`should return Audio component on renderPlayer method call`, () => {
    const WrappedMockComponent = withPlayer(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );
    const props = {src: `trailer`, poster: `poster`, muted: true};

    const renderWrapper = wrapper.find(MockComponent).renderProp(`renderPlayer`)(props);
    const playerWrapper = renderWrapper.children();

    expect(playerWrapper.type()).toEqual(VideoPlayer);
    expect(playerWrapper.props()).toMatchObject(props);
  });
});
