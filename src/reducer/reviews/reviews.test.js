import reviews from "../../mocks/reviews";
import reducer, {initialState, ActionCreator, Operation} from "./reviews";

const items = reviews.reduce((obj, it) => {
  obj[it.id] = it;
  return obj;
}, {});
const itemsIds = reviews.map((it) => it.id);


describe(`Reviews Reducer`, () => {
  it(`should return state`, () => {
    const action = {type: `UNKNOWN`};
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it(`should store reviews`, () => {
    const [id] = itemsIds;
    const movieToItems = {[id]: itemsIds};
    const action = ActionCreator.storeReviews(id, items, itemsIds);

    expect(reducer(initialState, action))
      .toEqual({...initialState, movieToItems, items});
  });
  it(`should make reviews API request and call storeReviews`, () => {
    const id = 7;
    const dispatch = jest.fn();
    const fetchMovieReviews = jest.fn(() => Promise.resolve(reviews));
    const fetchMovieReviewsThunk = Operation.fetchMovieReviews(id);

    return fetchMovieReviewsThunk(dispatch, undefined, {fetchMovieReviews})
      .then(() => {
        expect(fetchMovieReviews).toHaveBeenCalledTimes(1);
        expect(fetchMovieReviews).toHaveBeenCalledWith(id);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeReviews(id, items, itemsIds)
        );
      });
  });
  it(`should make submit movie review API request and call storeReviews`, () => {
    const id = 7;
    const review = {rating: 3, comment: `comment`};
    const dispatch = jest.fn();
    const submitMovieReview = jest.fn(() => Promise.resolve(reviews));
    const submitMovieReviewThunk = Operation.submitMovieReview(id, review);

    return submitMovieReviewThunk(dispatch, undefined, {submitMovieReview})
      .then(() => {
        expect(submitMovieReview).toHaveBeenCalledTimes(1);
        expect(submitMovieReview).toHaveBeenCalledWith(id, review);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeReviews(id, items, itemsIds)
        );
      });
  });
});
