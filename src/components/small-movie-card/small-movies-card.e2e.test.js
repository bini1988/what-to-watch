import React from "react";
import {configure, mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import {SmallMovieCard} from "./small-movie-card";
import card from "../../mocks/movie-card";

configure({adapter: new Adapter()});

jest.useFakeTimers();

describe(`SmallMovieCard`, () => {
  it(`should call onPlayerPlay on card mouse enter`, () => {
    const handlePlay = jest.fn();
    const wrapper = mount(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <SmallMovieCard
            card={card}
            autoPlayTimeout={100}
            onPlayerPlay={handlePlay}/>
        </MemoryRouter>
    );

    wrapper.simulate(`mouseenter`);
    expect(handlePlay).toBeCalled();
  });
  it(`should call onPlayerStop on card mouse leave`, () => {
    const handleStop = jest.fn();
    const wrapper = mount(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <SmallMovieCard
            card={card}
            onPlayerStop={handleStop}/>
        </MemoryRouter>
    );

    wrapper.simulate(`mouseleave`);
    expect(handleStop).toBeCalled();
  });
});
