import MockAxios from "axios-mock-adapter";
import movieCard, {MovieCardData} from "./mocks/movie-card";
import userCard, {UserData} from "./mocks/user";
import MovieCard from "./models/movie-card";
import MovieReview from "./models/movie-review";
import User from "./models/user";
import {createApi} from "./api";

it(`should make get movies API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const mockData = [{}, {}];

  apiMock.onGet(`/films`).reply(200, mockData);

  return api.fetchMovies().then((movies) => {
    expect(movies).toHaveLength(mockData.length);

    movies.forEach((it) =>
      expect(it).toBeInstanceOf(MovieCard)
    );
  });
});

it(`should make get promo movie API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());

  apiMock.onGet(`/films/promo`).reply(200, MovieCardData);

  return api.fetchPromoMovie().then((movie) => {
    expect(movie).toBeInstanceOf(MovieCard);
    expect(movie).toEqual(movieCard);
  });
});

it(`should make get my list movies API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const mockData = [{}, {}];

  apiMock.onGet(`/favorite`).reply(200, mockData);

  return api.fetchMyListMovies().then((movies) => {
    expect(movies).toHaveLength(mockData.length);

    movies.forEach((it) =>
      expect(it).toBeInstanceOf(MovieCard)
    );
  });
});

it(`should make post to add movie to my list API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const {id} = MovieCardData;

  apiMock.onPost(`/favorite/${id}/1`).reply(200, MovieCardData);

  return api.addMovieToMyList(id).then((movie) => {
    expect(movie).toBeInstanceOf(MovieCard);
    expect(movie).toEqual(movieCard);
  });
});

it(`should make post to remove movie from my list API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const {id} = MovieCardData;

  apiMock.onPost(`/favorite/${id}/0`).reply(200, MovieCardData);

  return api.deleteMovieFromMyList(id).then((movie) => {
    expect(movie).toBeInstanceOf(MovieCard);
    expect(movie).toEqual(movieCard);
  });
});

it(`should make get reviews API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const id = 10;
  const mockData = [{}, {}];

  apiMock.onGet(`/comments/${id}`).reply(200, mockData);

  return api.fetchMovieReviews(id).then((reviews) => {
    expect(reviews).toHaveLength(mockData.length);

    reviews.forEach((it) =>
      expect(it).toBeInstanceOf(MovieReview)
    );
  });
});

it(`should make post movie review API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const id = 10;
  const review = {rating: 5, comment: `comment`};
  const mockData = [{}, {}];

  apiMock.onPost(`/comments/${id}`, review)
    .reply(200, mockData);

  return api.submitMovieReview(id, review).then((reviews) => {
    expect(reviews).toHaveLength(mockData.length);

    reviews.forEach((it) =>
      expect(it).toBeInstanceOf(MovieReview)
    );
  });
});

it(`should make post user login API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const params = {email: `email`, password: `password`};

  apiMock.onPost(`/login`).reply(200, UserData);

  return api.loginUser(params).then((user) => {
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual(userCard);
  });
});

it(`should make get user echo API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());

  apiMock.onGet(`/login`).reply(200, UserData);

  return api.echoUser().then((user) => {
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual(userCard);
  });
});
