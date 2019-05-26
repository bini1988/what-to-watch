import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({adapter: new Adapter()});

jest.useFakeTimers();

describe.only(`SmallMovieCard`, () => {
  it(`should play trailer on card mouse enter`, () => {
    HTMLMediaElement.prototype.play = jest.fn();
    HTMLMediaElement.prototype.pause = jest.fn();
    HTMLMediaElement.prototype.load = jest.fn();

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

    expect(wrapper.state(`isTrailerPlaying`)).toEqual(false);

    wrapper.simulate(`mouseenter`);

    jest.runAllTimers();

    expect(wrapper.state(`isTrailerPlaying`)).toEqual(true);
  });
  it(`should stop trailer on card mouse leave`, () => {
    HTMLMediaElement.prototype.play = jest.fn();
    HTMLMediaElement.prototype.pause = jest.fn();
    HTMLMediaElement.prototype.load = jest.fn();

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

    wrapper.setState({isTrailerPlaying: true});
    wrapper.update();

    wrapper.simulate(`mouseleave`);
    wrapper.update();

    expect(wrapper.state(`isTrailerPlaying`)).toEqual(false);
  });
});
