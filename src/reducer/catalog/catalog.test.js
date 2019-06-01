import reducer, {initialState, ActionTypes, loadMovies, storeMovies, changeMoviesActiveGenre} from "./catalog";

describe(`Catalog Reducer`, () => {
  it(`should set activeGenre state by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = changeMoviesActiveGenre(activeGenre);

    expect(reducer(initialState, action))
      .toEqual({...initialState, activeGenre});
  });
  it(`should set movies state by storeMovies`, () => {
    const movies = [];
    const action = storeMovies(movies);

    expect(reducer(initialState, action))
      .toEqual({...initialState, movies});
  });
  it(`should return action by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = changeMoviesActiveGenre(activeGenre);

    expect(action)
      .toEqual({type: ActionTypes.CHANGE_MOVIES_ACTIVE_GENRE, payload: activeGenre});
  });
  it(`should make movies API request and call storeMovies`, () => {
    const mockData = [`movie#1`, `movie#2`];
    const dispatch = jest.fn();
    const fetchMovies = jest.fn(() => Promise.resolve(mockData));
    const loadMoviesThunk = loadMovies();

    return loadMoviesThunk(dispatch, undefined, {fetchMovies}).then(() => {
      expect(fetchMovies).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(storeMovies(mockData));
    });
  });
});
