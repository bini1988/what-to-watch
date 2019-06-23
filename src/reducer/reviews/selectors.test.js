import NameSpace from "../name-spaces";
import reviews from "../../mocks/reviews";
import {getReviews, getReviewsItems, getMovieReviewsIds, getMovieReviewsById} from "./selectors";
import {initialState} from "./reviews";

const movieId = 7;
const mockStore = {
  [NameSpace.REVIEWS]: {
    ...initialState,
    movieToItems: {
      [movieId]: reviews.map((it) => it.id),
    },
    items: reviews.reduce((out, it) => {
      out[it.id] = it;
      return out;
    }, {}),
  },
};

describe(`User Selectors`, () => {
  it(`should return reviews state`, () => {
    expect(getReviews(mockStore))
      .toEqual(mockStore[NameSpace.REVIEWS]);
  });
  it(`should return reviews items object state`, () => {
    expect(getReviewsItems(mockStore))
      .toEqual(mockStore[NameSpace.REVIEWS].items);
  });
  it(`should return reviews ids by movie id`, () => {
    expect(getMovieReviewsIds(mockStore, movieId))
      .toEqual(reviews.map((it) => it.id));
  });
  it(`should return reviews by movie id`, () => {
    expect(getMovieReviewsById(mockStore, movieId))
      .toEqual(reviews);
  });
});
