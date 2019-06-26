import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideoPlayer from "./with-video-player";

configure({adapter: new Adapter()});

jest.useFakeTimers();

function MockComponent() {
  return <div />;
}

describe(`withVideoPlayer`, () => {
  it(`should set isPlayerPlaying prop and call play with Play handler`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.resolve());

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();

    return component.prop(`onPlayerPlay`)().then(() => {
      wrapper.update();
      component = wrapper.find(MockComponent);
      expect(component.prop(`isPlayerPlaying`)).toEqual(true);
      expect(HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);

      HTMLVideoElement.prototype.play.mockRestore();
    });
  });
  it(`should set isPlayerPlaying prop and call play with Play handler after timeout`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.resolve());

    const WrappedMockComponent = withVideoPlayer({autoPlayTimeout: 500})(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();

    const playPromise = component.prop(`onPlayerPlay`)();

    jest.runAllTimers();

    return Promise.resolve()
      .then(() => playPromise)
      .then(() => {
        wrapper.update();
        component = wrapper.find(MockComponent);
        expect(component.prop(`isPlayerPlaying`)).toEqual(true);

        HTMLVideoElement.prototype.play.mockRestore();
      });
  });
  it(`should reset isPlayerPlaying prop and and call pause with Pause handler`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.resolve());
    HTMLVideoElement.prototype.pause = jest.fn();

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();

    return component.prop(`onPlayerPlay`)().then(() => {
      wrapper.update();

      component.prop(`onPlayerPause`)();
      wrapper.update();
      component = wrapper.find(MockComponent);
      expect(component.prop(`isPlayerPlaying`)).toEqual(false);
      expect(HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);

      HTMLVideoElement.prototype.play.mockRestore();
      HTMLVideoElement.prototype.pause.mockRestore();
    });
  });
  it(`should reset isPlayerPlaying prop and and call load with Stop handler`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.resolve());
    HTMLVideoElement.prototype.load = jest.fn();

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();

    return component.prop(`onPlayerPlay`)().then(() => {
      wrapper.update();

      component.prop(`onPlayerStop`)();
      wrapper.update();
      component = wrapper.find(MockComponent);
      expect(component.prop(`isPlayerPlaying`)).toEqual(false);
      expect(HTMLVideoElement.prototype.load).toHaveBeenCalledTimes(1);

      HTMLVideoElement.prototype.play.mockRestore();
      HTMLVideoElement.prototype.load.mockRestore();
    });
  });
  it(`should handle onPause video event`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const state = {
      isPlaying: true,
      totalTime: 100,
      currentTime: 50,
      progress: 50,
    };
    wrapper.setState(state);
    wrapper.update();

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    video.find(`video`).prop(`onPause`)();

    wrapper.update();

    expect(wrapper.state()).toEqual({
      ...state, isPlaying: false,
    });
  });
  it(`should handle onEnded video event`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const state = {
      isPlaying: true,
      totalTime: 100,
      currentTime: 50,
      progress: 50,
    };
    wrapper.setState(state);
    wrapper.update();

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    video.find(`video`).prop(`onEnded`)();

    wrapper.update();

    expect(wrapper.state()).toEqual({
      ...state,
      isPlaying: false,
      currentTime: 0,
      progress: 0
    });
  });
  it(`should handle onLoadStart video event`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    wrapper.setState({
      isPlaying: true,
      totalTime: 100,
      currentTime: 50,
      progress: 50,
    });
    wrapper.update();

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    video.find(`video`).prop(`onLoadStart`)();

    wrapper.update();

    expect(wrapper.state()).toEqual(
        wrapper.instance().initialState
    );
  });
  it(`should handle onCanPlayThrough video event`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    const duration = 65;
    const target = {duration};
    video.find(`video`).prop(`onCanPlayThrough`)({target});
    wrapper.update();

    expect(wrapper.state()).toEqual({
      ...wrapper.instance().initialState,
      totalTime: duration,
    });
  });
  it(`should handle onCanPlayThrough video event with autoplay`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.resolve());

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent autoplay={true}/>
    );

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    const duration = 65;
    const target = {duration};

    return video.find(`video`).prop(`onCanPlayThrough`)({target}).then(() => {
      wrapper.update();

      expect(wrapper.state()).toEqual({
        ...wrapper.instance().initialState,
        totalTime: duration,
        isPlaying: true,
      });

      HTMLVideoElement.prototype.play.mockRestore();
    });
  });
  it(`should handle onTimeUpdate video event`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );
    const state = {
      isPlaying: true,
      totalTime: 100,
      currentTime: 50,
      progress: 50,
    };

    wrapper.setState(state);
    wrapper.update();

    const video = wrapper
      .find(MockComponent)
      .renderProp(`renderPlayer`)();

    const currentTime = 65;
    const target = {currentTime};
    video.find(`video`).prop(`onTimeUpdate`)({target});
    wrapper.update();

    expect(wrapper.state()).toEqual({
      ...state, currentTime, progress: currentTime,
    });
  });
  it(`should handle onPlayerPlay error`, () => {
    HTMLVideoElement.prototype.play = jest.fn(() => Promise.reject());

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    wrapper.setState({
      isPlaying: true,
      totalTime: 100,
      currentTime: 50,
      progress: 50,
    });
    wrapper.update();

    const component = wrapper.find(MockComponent);
    wrapper.find(MockComponent).renderProp(`renderPlayer`)();

    return component.prop(`onPlayerPlay`)().then(() => {
      wrapper.update();
      expect(wrapper.state()).toEqual(
          wrapper.instance().initialState
      );
      HTMLVideoElement.prototype.play.mockRestore();
    });
  });
  it(`should return audio on renderPlayer method call`, () => {
    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );
    const props = {src: `trailer`, poster: `poster`, muted: true};

    const renderWrapper = wrapper.find(MockComponent).renderProp(`renderPlayer`)(props);
    const playerWrapper = renderWrapper.children();

    expect(playerWrapper.type()).toEqual(`video`);
    expect(playerWrapper.props()).toMatchObject(props);
  });
  it(`should set full screen mode with onPlayerFullScreen handler`, () => {
    HTMLVideoElement.prototype.requestFullscreen = jest.fn();

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();
    component.prop(`onPlayerFullScreen`)();
    wrapper.update();

    expect(HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(1);

    HTMLVideoElement.prototype.requestFullscreen.mockRestore();
  });
  it(`should exit full screen mode with onPlayerFullScreenExit handler`, () => {
    HTMLVideoElement.prototype.exitFullscreen = jest.fn();
    const fullscreenElement = document.fullscreenElement;
    document.fullscreenElement = true;

    const WrappedMockComponent = withVideoPlayer()(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`isPlayerPlaying`)).toEqual(false);

    wrapper.find(MockComponent).renderProp(`renderPlayer`)();
    component.prop(`onPlayerFullScreenExit`)();
    wrapper.update();

    expect(HTMLVideoElement.prototype.exitFullscreen).toHaveBeenCalledTimes(1);

    HTMLVideoElement.prototype.exitFullscreen.mockRestore();
    document.fullscreenElement = fullscreenElement;
  });
});
