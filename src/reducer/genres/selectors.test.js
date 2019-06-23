import NameSpace from "../name-spaces";
import movies from "../../mocks/movies";
import moviesGenres, {moviesIdsByGenres} from "../../mocks/movies-genres";
import {getGenres, getActiveGenre, getMoviesGenres, getMoviesIdsByGenre, getMoviesByGenre, getMoviesGenresList, getMoviesGenreLike, getLimitByGenre, MAX_ITEMS_PER_PAGE} from "./selectors";
import {initialState} from "./genres";

const ALL_GENRES = `All genres`;
const mockGenres = {
  ...initialState,
  activeGenre: ALL_GENRES,
  items: moviesIdsByGenres,
  limits: {Action: 7},
};
const mockMovies = {
  itemsIds: movies.map((it) => it.id),
  items: movies.reduce((out, it) => {
    out[it.id] = it;
    return out;
  }, {}),
};
const mockStore = {
  [NameSpace.GENRES]: mockGenres,
  [NameSpace.MOVIES]: mockMovies,
};

const toMovie = (id) => mockMovies.items[id];

describe(`Genres Selectors`, () => {
  it(`should return genres state`, () => {
    expect(getGenres(mockStore))
      .toEqual(mockGenres);
  });
  it(`should return active genre`, () => {
    expect(getActiveGenre(mockStore))
      .toEqual(mockGenres.activeGenre);
  });
  it(`should return movies genres`, () => {
    expect(getMoviesGenres(mockStore))
      .toEqual(mockGenres.items);
  });
  it(`should return movies ids by genre`, () => {
    expect(getMoviesIdsByGenre(mockStore, ALL_GENRES))
      .toEqual(mockGenres.items[ALL_GENRES]);
  });
  it(`should return movies by genre`, () => {
    expect(getMoviesByGenre(mockStore, ALL_GENRES))
      .toEqual(mockGenres.items[ALL_GENRES].map(toMovie));
  });
  it(`should return genres list`, () => {
    expect(getMoviesGenresList(mockStore))
      .toEqual(Object.keys(moviesGenres));
  });
  it(`should return genres like movies list`, () => {
    const {id, genre} = movies[0];
    expect(getMoviesGenreLike(mockStore, id))
      .toEqual(moviesIdsByGenres[genre]
          .filter((movieId) => movieId !== id)
          .map(toMovie));
  });
  it(`should return unknown genre limit`, () => {
    expect(getLimitByGenre(mockStore, `unknown`))
      .toEqual(MAX_ITEMS_PER_PAGE);
  });
  it(`should return default genre limit`, () => {
    expect(getLimitByGenre(mockStore, ALL_GENRES))
      .toEqual(MAX_ITEMS_PER_PAGE);
  });
  it(`should return genre limit`, () => {
    expect(getLimitByGenre(mockStore, `Action`))
      .toEqual(mockGenres.limits.Action);
  });
});
