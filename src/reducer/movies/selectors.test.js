import NameSpace from "../name-spaces";
import movieCard from "../../mocks/movie-card";
import {getMovies, getMoviesItems, getMovieById} from "./selectors";
import {initialState} from "./movies";

const mockMovies = {
  ...initialState,
  itemsIds: [movieCard.id],
  items: {
    [movieCard.id]: movieCard,
  },
};
const mockStore = {
  [NameSpace.Movies]: mockMovies,
};

describe(`Movies Selectors`, () => {
  it(`should return movies state`, () => {
    expect(getMovies(mockStore))
      .toEqual(mockMovies);
  });
  it(`should return movies items object state`, () => {
    expect(getMoviesItems(mockStore))
      .toEqual(mockMovies.items);
  });
  it(`should return movie by id`, () => {
    expect(getMovieById(mockStore, movieCard.id))
      .toEqual(movieCard);
  });
});
