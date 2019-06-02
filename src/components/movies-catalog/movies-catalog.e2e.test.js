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
      id: 11,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    }, {
      id: 22,
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
    const card = wrapper.find(`.catalog__movies-card[id='movie-${activeCard.id}']`);
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
    const card = wrapper.find(`.catalog__movies-card[id='movie-${activeCard.id}']`);
    expect(card).toHaveLength(1);

    card.simulate(`mouseleave`);
    expect(handleResetActiveElement).toBeCalled();
  });
  it(`Should call onMoviesMore method on more button click`, () => {
    const handleMoviesMore = jest.fn();
    const wrapper = mount(
        <MoviesCatalog
          moviesGenreGroups={genreGroupsMock}
          activeGenre="All Genres"
          onMoviesMore={handleMoviesMore}/>
    );

    const moreBtn = wrapper.find(`.catalog__more .catalog__button`);
    expect(moreBtn).toHaveLength(1);

    moreBtn.simulate(`click`);
    expect(handleMoviesMore).toBeCalled();
  });
});
