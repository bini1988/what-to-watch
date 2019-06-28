import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import card from "../../mocks/movie-card";
import {VideoPlayerPageView} from "./video-player-page";
import VideoPlayer from "../video-player/video-player";

configure({adapter: new Adapter()});

describe(`VideoPlayerPageView`, () => {
  it(`Should call onExit handler`, () => {
    const handlePush = jest.fn();
    const wrapper = shallow(
        <VideoPlayerPageView
          movie={card}
          history={{push: handlePush}}
          onMovieFetch={() => {}}/>
    );

    const component = wrapper.find(VideoPlayer);

    component.prop(`onExit`)();
    expect(handlePush).toHaveBeenCalledWith(`/film/${card.id}`);
  });
});
