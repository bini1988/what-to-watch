import movies from "../../mocks/movies";
import NameSpace from "../name-spaces";
import {moviesIdsByGenres} from "../../mocks/movies-groups";
import reducer, {initialState, ActionCreator, Operation} from "./movies";
import {ActionCreator as GenresActionCreator} from "../genres/genres";

const moviesItems = movies.reduce((obj, it) => {
  obj[it.id] = it;
  return obj;
}, {});
const moviesItemsIds = movies.map((it) => it.id);


describe(`Movies Reducer`, () => {
  it(`should store movies by storeMovies`, () => {
    const items = {};
    const itemsIds = [`id1`, `id2`];
    const action = ActionCreator.storeMovies(items, itemsIds);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items, itemsIds});
  });
  it(`should store movie by storeMovie`, () => {
    const movie = {id: `id0`};
    const items = {[movie.id]: movie};
    const action = ActionCreator.storeMovie(movie);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items});
  });
  it(`should store promo movie by storeMovie`, () => {
    const movie = {id: `id0`};
    const items = {[movie.id]: movie};
    const promoMovieId = movie.id;
    const action = ActionCreator.storeMovie(movie, true);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items, promoMovieId});
  });
  it(`should store my list movies by storeMyListMovies`, () => {
    const items = {};
    const myListMoviesIds = [`id1`, `id2`];
    const action = ActionCreator.storeMyListMovies(items, myListMoviesIds);

    expect(reducer(initialState, action))
      .toEqual({...initialState, items, myListMoviesIds});
  });
  it(`should make movies API request and call storeMovies & storeMoviesGenres`, () => {
    const dispatch = jest.fn();
    const fetchMovies = jest.fn(() => Promise.resolve(movies));
    const fetchMoviesThunk = Operation.fetchMovies();

    return fetchMoviesThunk(dispatch, undefined, {fetchMovies}).then(() => {
      expect(fetchMovies).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch.mock.calls[0][0]).toEqual(
          ActionCreator.storeMovies(moviesItems, moviesItemsIds)
      );

      const storeMoviesGenresThunk = dispatch.mock.calls[1][0];
      const dispatchGenres = jest.fn();

      storeMoviesGenresThunk(dispatchGenres);

      expect(dispatchGenres).toHaveBeenCalledTimes(1);
      expect(dispatchGenres).toHaveBeenCalledWith(
          GenresActionCreator.storeGenres(moviesIdsByGenres)
      );
    });
  });
  it(`should make movies API request if movies id is not exist`, () => {
    const id = 17;
    const dispatch = jest.fn((arg) => arg);
    const getState = () => ({
      [NameSpace.Movies]: {
        ...initialState,
      },
    });

    const spy = jest.spyOn(Operation, `fetchMovies`);

    Operation.fetchMovies = jest.fn(() => Promise.resolve(movies));

    const fetchMovieThunk = Operation.fetchMovie(id);

    return fetchMovieThunk(dispatch, getState)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(Operation.fetchMovies).toHaveBeenCalledTimes(1);

        spy.mockRestore();
      });
  });
  it(`should return movie if movies id is exist`, () => {
    const id = 17;
    const movie = {id};
    const dispatch = jest.fn((arg) => arg);
    const getState = () => ({
      [NameSpace.Movies]: {
        ...initialState,
        items: {[id]: movie}
      },
    });

    const fetchMovieThunk = Operation.fetchMovie(id);

    return fetchMovieThunk(dispatch, getState)
      .then((result) => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(result).toEqual(movie);
      });
  });
  it(`should make promo movie API request and call storeMovie`, () => {
    const movie = {id: 7};
    const dispatch = jest.fn();
    const fetchPromoMovie = jest.fn(() => Promise.resolve(movie));
    const fetchPromoMovieThunk = Operation.fetchPromoMovie();

    return fetchPromoMovieThunk(dispatch, undefined, {fetchPromoMovie})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeMovie(movie, true)
        );
      });
  });
  it(`should make my list movies API request and call storeMyListMovies`, () => {
    const dispatch = jest.fn();
    const fetchMyListMovies = jest.fn(() => Promise.resolve(movies));
    const fetchMyListMoviesThunk = Operation.fetchMyListMovies();

    return fetchMyListMoviesThunk(dispatch, undefined, {fetchMyListMovies})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeMyListMovies(moviesItems, moviesItemsIds)
        );
      });
  });
  it(`should make add movies in my list API request and call storeMovie`, () => {
    const id = 7;
    const movie = {id, isInList: false};
    const dispatch = jest.fn();
    const getState = () => ({
      [NameSpace.Movies]: {
        ...initialState,
        items: {[id]: movie}
      },
    });
    const addMovieToMyList = jest.fn(() => Promise.resolve(movie));
    const toggleMovieToMyListThunk = Operation.toggleMovieToMyList(id);

    return toggleMovieToMyListThunk(dispatch, getState, {addMovieToMyList})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeMovie(movie)
        );
      });
  });
  it(`should make remove movies from my list API request and call storeMovie`, () => {
    const id = 7;
    const movie = {id, isInList: true};
    const dispatch = jest.fn();
    const getState = () => ({
      [NameSpace.Movies]: {
        ...initialState,
        items: {[id]: movie}
      },
    });
    const deleteMovieFromMyList = jest.fn(() => Promise.resolve(movie));
    const toggleMovieToMyListThunk = Operation.toggleMovieToMyList(id);

    return toggleMovieToMyListThunk(dispatch, getState, {deleteMovieFromMyList})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
            ActionCreator.storeMovie(movie)
        );
      });
  });
  it(`should reject if toggleMovieToMyList was called with non existent id`, () => {
    const id = 7;
    const dispatch = jest.fn();
    const getState = () => ({
      [NameSpace.Movies]: {
        ...initialState,
      },
    });
    const toggleMovieToMyListThunk = Operation.toggleMovieToMyList(id);

    return expect(toggleMovieToMyListThunk(dispatch, getState))
      .rejects.toEqual(`Unknown movie id`);
  });
});
