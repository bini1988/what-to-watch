import NameSpace from "../name-spaces";
import movieCard from "../../mocks/movie-card";
import {getMovies, getMoviesItems, getMovieById, getPromoMovie, getMoviesList, getMyListMovies} from "./selectors";
import {initialState} from "./movies";

const mockMovies = {
  ...initialState,
  promoMovieId: movieCard.id,
  itemsIds: [movieCard.id],
  items: {
    [movieCard.id]: movieCard,
  },
};
const mockStore = {
  [NameSpace.MOVIES]: mockMovies,
};

describe(`Movies Selectors`, () => {
  it(`should return movies state`, () => {
    expect(getMovies(mockStore))
      .toEqual(mockMovies);
  });
  it(`should return movies items object state`, () => {
    expect(getMoviesItems(mockStore))
      .toEqual(mockMovies.items);
  });
  it(`should return movie by id`, () => {
    expect(getMovieById(mockStore, movieCard.id))
      .toEqual(movieCard);
  });
  it(`should return movie with review by id`, () => {

  });
  it(`should return promo movie`, () => {
    expect(getPromoMovie(mockStore))
      .toEqual(movieCard);
  });
  it(`should return movies list`, () => {
    const mockMoviesStore = {
      [NameSpace.MOVIES]: {
        ...initialState,
        itemsIds: [`1`, `2`, `3`],
        items: {
          [`1`]: {...movieCard, id: `1`},
          [`2`]: {...movieCard, id: `2`},
          [`3`]: {...movieCard, id: `3`},
        },
      },
    };

    expect(getMoviesList(mockMoviesStore))
      .toEqual([
        {...movieCard, id: `1`},
        {...movieCard, id: `2`},
        {...movieCard, id: `3`},
      ]);
  });
  it(`should return my movies list`, () => {
    const mockMoviesStore = {
      [NameSpace.MOVIES]: {
        ...initialState,
        itemsIds: [`1`, `2`, `3`],
        myListMoviesIds: [`1`, `3`],
        items: {
          [`1`]: {...movieCard, id: `1`},
          [`2`]: {...movieCard, id: `2`},
          [`3`]: {...movieCard, id: `3`},
        },
      },
    };

    expect(getMyListMovies(mockMoviesStore))
      .toEqual([
        {...movieCard, id: `1`},
        {...movieCard, id: `3`},
      ]);
  });
});
