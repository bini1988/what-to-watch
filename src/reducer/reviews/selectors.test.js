import NameSpace from "../name-spaces";
import {getReviews, getReviewsItems, getMovieReviewsIds} from "./selectors";
import {initialState} from "./reviews";

const mockStore = {
  [NameSpace.Reviews]: {...initialState},
};

describe(`User Selectors`, () => {
  it(`should return reviews state`, () => {
    expect(getReviews(mockStore))
      .toEqual(initialState);
  });
  it(`should return reviews items object state`, () => {
    expect(getReviewsItems(mockStore))
      .toEqual(initialState.items);
  });
  it(`should return reviews ids by movie id`, () => {
    const movieId = 7;
    const movies = [`movie#0`, `movie#1`, `movie#2`];
    const mockReviewsStore = {
      [NameSpace.Reviews]: {
        ...initialState,
        movieToItems: {
          [movieId]: movies,
        },
      },
    };

    expect(getMovieReviewsIds(mockReviewsStore, movieId))
      .toEqual(movies);
  });
});
