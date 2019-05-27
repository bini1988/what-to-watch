import initialMovies from "./mocks/movies";

export const QUERY_MOVIES_BY_GENRE = `QUERY_MOVIES_BY_GENRE`;

export const ALL_GENRES_GROUP = `All genres`;

/**
 * Получение списка фильмов сгруппированног по жанрам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getMoviesByGenres = (state) => {
  const {movies} = state;
  const genresGroups = {[ALL_GENRES_GROUP]: movies};

  return movies.reduce((out, it) => {
    out[it.genre] = out[it.genre] || [];
    out[it.genre].push(it);

    return out;
  }, genresGroups);
};

/**
 * Изменить фильтр списка фильмов по жанру
 * @param {string} genre Жанр фильма
 * @return {Object}
 */
export const queryMoviesByGenre = (genre) => {
  return {type: QUERY_MOVIES_BY_GENRE, payload: genre};
};


export const initialState = {
  /** Фильтр списка фильмов по жанру */
  activeGenre: ALL_GENRES_GROUP,
  /** Список фильмов */
  movies: initialMovies,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUERY_MOVIES_BY_GENRE:
      return {...state, activeGenre: action.payload};
    default:
      return state;
  }
};
