import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SmallMovieCard} from "./small-movie-card";
import card from "../../mocks/movie-card";

configure({adapter: new Adapter()});

jest.useFakeTimers();

describe(`SmallMovieCard`, () => {
  it(`should call onPlayerPlay on card mouse enter`, () => {
    const handlePlay = jest.fn();
    const wrapper = mount(
        <SmallMovieCard
          card={card}
          autoPlayTimeout={100}
          onPlayerPlay={handlePlay}/>
    );

    wrapper.simulate(`mouseenter`);
    expect(handlePlay).toBeCalled();
  });
  it(`should call onPlayerPause on card mouse leave`, () => {
    const handlePause = jest.fn();
    const wrapper = mount(
        <SmallMovieCard
          card={card}
          onPlayerPause={handlePause}/>
    );

    wrapper.simulate(`mouseleave`);
    expect(handlePause).toBeCalled();
  });
});
