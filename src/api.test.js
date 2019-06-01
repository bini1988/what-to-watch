import MockAxios from "axios-mock-adapter";
import MovieCard from "./models/movie-card";
import {axiosInstance, fetchMovies} from "./api";

it(`should make get movies API request`, () => {
  const apiMock = new MockAxios(axiosInstance);
  const mockData = [{}, {}];

  apiMock.onGet(`/films`).reply(200, mockData);

  return fetchMovies().then((movies) => {
    expect(movies).toHaveLength(mockData.length);
    movies.forEach((it) => expect(it).toBeInstanceOf(MovieCard));
  });
});
