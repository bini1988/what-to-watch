import reducer, {initialState, ActionTypes, ActionCreator, Operation} from "./movies";

describe(`Movies Reducer`, () => {
  it(`should set activeGenre state by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = ActionCreator.changeActiveGenre(activeGenre);

    expect(reducer(initialState, action))
      .toEqual({...initialState, activeGenre});
  });
  it(`should set movies state by storeMovies`, () => {
    const items = [];
    const action = ActionCreator.storeMovies(items);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items});
  });
  it(`should return action by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = ActionCreator.changeActiveGenre(activeGenre);

    expect(action)
      .toEqual({type: ActionTypes.CHANGE_ACTIVE_GENRE, payload: activeGenre});
  });
  it(`should make movies API request and call storeMovies`, () => {
    const mockData = [`movie#1`, `movie#2`];
    const dispatch = jest.fn();
    const fetchMovies = jest.fn(() => Promise.resolve(mockData));
    const loadMoviesThunk = Operation.fetchMovies();

    return loadMoviesThunk(dispatch, undefined, {fetchMovies}).then(() => {
      expect(fetchMovies).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.storeMovies(mockData));
    });
  });
});
