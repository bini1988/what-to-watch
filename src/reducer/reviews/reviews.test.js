import {NotificationManager} from "react-notifications";
import reviews from "../../mocks/reviews";
import reducer, {initialState, ActionCreator, Operation} from "./reviews";

const items = reviews.reduce((obj, it) => {
  obj[it.id] = it;
  return obj;
}, {});
const itemsIds = reviews.map((it) => it.id);


describe(`Reviews Reducer`, () => {
  it(`should return initialState`, () => {
    const action = {type: `UNKNOWN`};
    expect(reducer(undefined, action)).toEqual(initialState);
  });
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
  it(`should handle failed reviews API request`, () => {
    const id = 7;
    const dispatch = jest.fn();
    const error = new Error(`Handle error`);
    const fetchMovieReviews = jest.fn(() => Promise.reject(error));
    const fetchMovieReviewsThunk = Operation.fetchMovieReviews(id);

    const spy = jest.spyOn(NotificationManager, `error`);

    return fetchMovieReviewsThunk(dispatch, undefined, {fetchMovieReviews})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(NotificationManager.error).toHaveBeenCalledTimes(1);
        expect(NotificationManager.error).toHaveBeenCalledWith(error.message);

        spy.mockRestore();
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
  it(`should handle failed submit movie review API request`, () => {
    const id = 7;
    const review = {rating: 3, comment: `comment`};
    const dispatch = jest.fn();
    const error = new Error(`Handle error`);
    const submitMovieReview = jest.fn(() => Promise.reject(error));
    const submitMovieReviewThunk = Operation.submitMovieReview(id, review);

    const spy = jest.spyOn(NotificationManager, `error`);

    return submitMovieReviewThunk(dispatch, undefined, {submitMovieReview})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(NotificationManager.error).toHaveBeenCalledTimes(1);
        expect(NotificationManager.error).toHaveBeenCalledWith(error.message);

        spy.mockRestore();
      })
      .catch((err) => {
        expect(err).toEqual(error);
      });
  });
});
