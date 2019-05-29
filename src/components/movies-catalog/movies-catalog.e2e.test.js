import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MoviesCatalog} from "./movies-catalog";

configure({adapter: new Adapter()});

HTMLMediaElement.prototype.play = jest.fn();
HTMLMediaElement.prototype.pause = jest.fn();
HTMLMediaElement.prototype.load = jest.fn();

const genreGroupsMock = {
  "All Genres": [
    {
      id: `480d2236-6c7d-4fd3-a225-80c66710a71f`,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    }, {
      id: `505f451a-0b69-47ed-96c6-66d5525d5a5e`,
      title: `Bohemian Rhapsody`,
      img: `img/bohemian-rhapsody.jpg`,
    }
  ]};

describe(`MoviesCatalog`, () => {
  it(`Should call setActiveElement method on movie's card mouse enter event`, () => {
    const handleSetActiveElement = jest.fn();
    const wrapper = mount(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          setActiveElement={handleSetActiveElement}/>
    );

    const activeCard = genreGroupsMock[`All Genres`][0];
    const card = wrapper.find(`.catalog__movies-card[id='${activeCard.id}']`);
    expect(card).toHaveLength(1);

    card.simulate(`mouseenter`);
    expect(handleSetActiveElement).toHaveBeenCalledWith(activeCard);
  });
  it(`Should call resetActiveElement method on movie's card mouse leave event`, () => {
    const handleResetActiveElement = jest.fn();
    const wrapper = mount(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          resetActiveElement={handleResetActiveElement}/>
    );

    const activeCard = genreGroupsMock[`All Genres`][0];
    const card = wrapper.find(`.catalog__movies-card[id='${activeCard.id}']`);
    expect(card).toHaveLength(1);

    card.simulate(`mouseleave`);
    expect(handleResetActiveElement).toBeCalled();
  });
});
