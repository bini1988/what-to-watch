import {ALL_GENRES_GROUP, getMoviesByGenres} from "./selectors";
import NameSpace from "../name-spaces";

describe(`Movies Selectors`, () => {
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
    const state = {[NameSpace.Catalog]: {movies}};
    const groups = getMoviesByGenres(state);

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
