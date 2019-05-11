import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({adapter: new Adapter()});

describe(`SmallMovieCard`, () => {
  it(`should call handler on movie's title click`, () => {
    const titleClickHandler = jest.fn();
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
    };
    const wrapper = shallow(
        <SmallMovieCard
          card={cardMock}
          onTitleClick={titleClickHandler}/>
    );

    const btn = wrapper.find(`.small-movie-card__title`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(titleClickHandler).toHaveBeenCalledTimes(1);
  });
  it(`should call handler on movie's Play click`, () => {
    const playHandler = jest.fn();
    const cardMock = {
      id: `b15a1da5-8142-4d2a-b567-26599e333988`,
      title: `Movie Title`,
      img: `img/path`,
    };
    const wrapper = shallow(
        <SmallMovieCard
          card={cardMock}
          onMoviePlay={playHandler}/>
    );

    const btn = wrapper.find(`.small-movie-card__play-btn`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(playHandler).toHaveBeenCalledTimes(1);
    expect(playHandler).toHaveBeenCalledWith(cardMock);
  });
});
