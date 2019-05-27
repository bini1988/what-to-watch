import reducer, {initialState, QUERY_MOVIES_BY_GENRE, getMoviesByGenres, changeMoviesActiveGenre, ALL_GENRES_GROUP} from "./reducer";

describe(`App Reducer`, () => {
  it(`should set activeGenre state by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = changeMoviesActiveGenre(activeGenre);

    expect(reducer(initialState, action))
      .toEqual({...initialState, activeGenre});
  });
  it(`should return action by changeMoviesActiveGenre`, () => {
    const activeGenre = `GENRE`;
    const action = changeMoviesActiveGenre(activeGenre);

    expect(action)
      .toEqual({type: QUERY_MOVIES_BY_GENRE, payload: activeGenre});
  });
  it(`should return grouped movies by getMoviesByGenres`, () => {
    const movies = [
      {id: `0`, genre: `1`},
      {id: `1`, genre: `2`},
      {id: `2`, genre: `3`},
      {id: `3`, genre: `2`},
      {id: `4`, genre: `4`},
      {id: `5`, genre: `1`},
      {id: `6`, genre: `5`},
    ];
    const groups = getMoviesByGenres({movies});

    expect(groups).toEqual({
      [ALL_GENRES_GROUP]: movies,
      1: [movies[0], movies[5]],
      2: [movies[1], movies[3]],
      3: [movies[2]],
      4: [movies[4]],
      5: [movies[6]],
    });
  });
});
