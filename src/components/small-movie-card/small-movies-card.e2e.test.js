import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({adapter: new Adapter()});

describe(`SmallMovieCard`, () => {
  it(`should call handler on movie's title click`, () => {
    const titleClickHandler = jest.fn();
    const wrapper = shallow(
        <SmallMovieCard
          title="Movie Title"
          onTitleClick={titleClickHandler}/>
    );

    const btn = wrapper.find(`.small-movie-card__title`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(titleClickHandler).toHaveBeenCalledTimes(1);
  });
});
