import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({adapter: new Adapter()});

jest.useFakeTimers();

describe.only(`SmallMovieCard`, () => {
  it(`should play trailer on card mouse enter`, () => {
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
      trailer: `trailer/path`,
    };
    const wrapper = mount(
        <SmallMovieCard
          card={cardMock}/>
    );

    const player = wrapper.find(`.small-movie-card__image`).childAt(0);
    const playerInstance = player.instance();

    const playMethodSpy = jest
      .spyOn(playerInstance, `play`)
      .mockImplementation(jest.fn());

    wrapper.simulate(`mouseenter`);

    jest.runAllTimers();

    expect(playMethodSpy).toHaveBeenCalled();

    playMethodSpy.mockRestore();
  });
  it(`should stop trailer on card mouse leave`, () => {
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
      trailer: `trailer/path`,
    };
    const wrapper = mount(
        <SmallMovieCard
          card={cardMock}/>
    );

    const player = wrapper.find(`.small-movie-card__image`).childAt(0);
    const playerInstance = player.instance();

    const stopMethodSpy = jest
      .spyOn(playerInstance, `stop`)
      .mockImplementation(jest.fn());

    wrapper.simulate(`mouseleave`);

    expect(stopMethodSpy).toHaveBeenCalled();

    stopMethodSpy.mockRestore();
  });
});
