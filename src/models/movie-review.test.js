import MovieReview from "./movie-review";
import review, {MovieReviewData} from "../mocks/review";

describe(`MovieReview model`, () => {
  it(`should return User model`, () => {
    expect(new MovieReview(MovieReviewData))
      .toEqual(review);
  });
});
