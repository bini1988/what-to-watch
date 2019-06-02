import MockAxios from "axios-mock-adapter";
import MovieCard from "./models/movie-card";
import {createApi} from "./api";

it(`should make get movies API request`, () => {
  const api = createApi();
  const apiMock = new MockAxios(api.getInstance());
  const mockData = [{}, {}];

  apiMock.onGet(`/films`).reply(200, mockData);

  return api.fetchMovies().then((movies) => {
    expect(movies).toHaveLength(mockData.length);
    movies.forEach((it) => expect(it).toBeInstanceOf(MovieCard));
  });
});
