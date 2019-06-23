import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list";

configure({adapter: new Adapter()});

describe(`GenresList`, () => {
  it(`Should call onGenreChange handler`, () => {
    const handleGenreChange = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = mount(
        <GenresList
          genres={[`Drama`]}
          onGenreChange={handleGenreChange}/>
    );

    const link = wrapper.find(`.catalog__genres-link`).at(0);
    const target = link.getDOMNode();

    link.simulate(`click`, {preventDefault, target});

    expect(preventDefault).toHaveBeenCalled();
    expect(handleGenreChange).toHaveBeenCalledWith(`Drama`);
  });
});
