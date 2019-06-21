import NameSpace from "../name-spaces";
import movieGenres from "../../mocks/movies-groups";
import {getGenres, getActiveGenre, getMoviesGenres, getMoviesIdsByGenre} from "./selectors";
import {initialState} from "./genres";

const ALL_GENRES = `All genres`;
const mockGenres = {
  ...initialState,
  activeGenre: ALL_GENRES,
  items: movieGenres,
};
const mockStore = {
  [NameSpace.Genres]: mockGenres,
};

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
  it(`should return movies by genre`, () => {
    expect(getMoviesIdsByGenre(mockStore, ALL_GENRES))
      .toEqual(mockGenres.items[ALL_GENRES]);
  });
});
