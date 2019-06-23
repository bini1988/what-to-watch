import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ListButton from "./list-button";

configure({adapter: new Adapter()});

describe(`ListButton`, () => {
  it(`Should call onToMyListToggle handler`, () => {
    const card = {id: 7};
    const handleToMyListToggle = jest.fn();
    const wrapper = mount(
        <ListButton
          card={card}
          onToMyListToggle={handleToMyListToggle}/>
    );

    const button = wrapper.find(`.movie-card__button`);
    button.simulate(`click`);

    expect(handleToMyListToggle).toHaveBeenCalledWith(card.id);
  });
});
