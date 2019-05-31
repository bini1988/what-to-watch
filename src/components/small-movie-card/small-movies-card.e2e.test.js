import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SmallMovieCard} from "./small-movie-card";

configure({adapter: new Adapter()});

jest.useFakeTimers();

describe(`SmallMovieCard`, () => {
  it(`should call onPlayerPlay on card mouse enter`, () => {
    const handlePlay = jest.fn();
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
      trailer: `trailer/path`,
    };
    const wrapper = mount(
        <SmallMovieCard
          card={cardMock}
          autoPlayTimeout={100}
          onPlayerPlay={handlePlay}/>
    );

    wrapper.simulate(`mouseenter`);
    expect(handlePlay).toBeCalled();
  });
  it(`should call onPlayerPause on card mouse leave`, () => {
    const handlePause = jest.fn();
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
      trailer: `trailer/path`,
    };
    const wrapper = mount(
        <SmallMovieCard
          card={cardMock}
          onPlayerPause={handlePause}/>
    );

    wrapper.simulate(`mouseleave`);
    expect(handlePause).toBeCalled();
  });
});
