import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {VideoPlayerPage} from "./video-player-page";
import VideoPlayer from "../video-player/video-player";

configure({adapter: new Adapter()});

describe(`VideoPlayerPage`, () => {
  it(`Should call onExit handler`, () => {
    const handleGoBack = jest.fn();
    const wrapper = shallow(
        <VideoPlayerPage
          history={{goBack: handleGoBack}}/>
    );

    const component = wrapper.find(VideoPlayer);

    component.prop(`onExit`)();
    expect(handleGoBack).toHaveBeenCalled();
  });
});
