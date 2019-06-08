import {ALL_GENRES_GROUP, getMoviesByGenres} from "./selectors";
import NameSpace from "../name-spaces";

describe(`Movies Selectors`, () => {
  it(`should return grouped movies by getMoviesByGenres`, () => {
    const items = [
      {id: `0`, genre: `1`},
      {id: `1`, genre: `2`},
      {id: `2`, genre: `3`},
      {id: `3`, genre: `2`},
      {id: `4`, genre: `4`},
      {id: `5`, genre: `1`},
      {id: `6`, genre: `5`},
    ];
    const state = {[NameSpace.Movies]: {items}};
    const groups = getMoviesByGenres(state);

    expect(groups).toEqual({
      [ALL_GENRES_GROUP]: items,
      1: [items[0], items[5]],
      2: [items[1], items[3]],
      3: [items[2]],
      4: [items[4]],
      5: [items[6]],
    });
  });
});
