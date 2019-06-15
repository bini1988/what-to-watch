import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {VideoPlayer} from "./video-player";

configure({adapter: new Adapter()});

describe(`VideoPlayer`, () => {
  it(`should call onExit callback`, () => {
    const hanleExit = jest.fn();
    const hanlePlayerFullScreenExit = jest.fn();
    const hanlePlayerPause = jest.fn();

    const wrapper = mount(
        <VideoPlayer
          src=""
          onExit={hanleExit}
          onPlayerFullScreenExit={hanlePlayerFullScreenExit}
          onPlayerPause={hanlePlayerPause}/>
    );

    const button = wrapper.find(`.player__exit`);
    button.simulate(`click`);

    expect(hanleExit).toBeCalledTimes(1);
    expect(hanlePlayerPause).toBeCalledTimes(1);
    expect(hanlePlayerFullScreenExit).toBeCalledTimes(1);
  });
});
