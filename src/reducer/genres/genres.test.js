import NameSpace from "../name-spaces";
import movies from "../../mocks/movies";
import {moviesIdsByGenres} from "../../mocks/movies-groups";
import {MAX_ITEMS_PER_PAGE} from "./selectors";
import reducer, {initialState, ActionCreator, Operation} from "./genres";

describe(`Genres Reducer`, () => {
  it(`should store movies by storeGenres`, () => {
    const action = ActionCreator.storeGenres(moviesIdsByGenres);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items: moviesIdsByGenres});
  });
  it(`should change active genre by changeActiveGenre`, () => {
    const activeGenre = `All Genres`;
    const action = ActionCreator.changeActiveGenre(activeGenre);

    expect(reducer(initialState, action))
      .toEqual({...initialState, activeGenre});
  });
  it(`should change genre limit by changeGenreLimit`, () => {
    const genre = `All Genres`;
    const limit = 7;
    const action = ActionCreator.changeGenreLimit(genre, limit);

    expect(reducer(initialState, action))
      .toEqual({...initialState, limits: {[genre]: limit}});
  });
  it(`should store movies genres by storeMoviesGenres`, () => {
    const dispatch = jest.fn();
    const storeMoviesGenresThunk = Operation.storeMoviesGenres(movies);

    storeMoviesGenresThunk(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
        ActionCreator.storeGenres(moviesIdsByGenres)
    );
  });
  it(`should increase genre limit by increaseGenreLimit`, () => {
    const genre = `Actions`;
    const limit = 7;
    const genreCount = 5;
    const dispatch = jest.fn((arg) => arg);
    const getState = () => ({
      [NameSpace.Genres]: {
        ...initialState,
        items: {[genre]: Array.from({length: genreCount})},
        limits: {[genre]: limit}
      },
    });
    const nextLimit = Math.min(genreCount, limit + MAX_ITEMS_PER_PAGE);
    const increaseGenreLimitThunk = Operation.increaseGenreLimit(genre);

    increaseGenreLimitThunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
        ActionCreator.changeGenreLimit(genre, nextLimit)
    );
  });
});
