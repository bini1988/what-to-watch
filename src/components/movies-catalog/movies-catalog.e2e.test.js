import React from "react";
import {MemoryRouter} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviesCatalog from "./movies-catalog";
import genreGroupsMock from "../../mocks/movies-groups";

configure({adapter: new Adapter()});

describe(`MoviesCatalog`, () => {
  it(`Should call onMoviesMore method on more button click`, () => {
    const handleMoviesMore = jest.fn();
    const wrapper = mount(
        <MemoryRouter
          initialEntries = {[`/`]}>
          <MoviesCatalog
            movies={genreGroupsMock[`All Genres`]}
            moviesGenres={Object.keys(genreGroupsMock)}
            activeGenre="All Genres"
            onMoviesMore={handleMoviesMore}/>
        </MemoryRouter>
    );

    const moreBtn = wrapper.find(`.catalog__more .catalog__button`);
    expect(moreBtn).toHaveLength(1);

    moreBtn.simulate(`click`);
    expect(handleMoviesMore).toBeCalled();
  });
});
