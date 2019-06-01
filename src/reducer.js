
export const STORE_MOVIES = `STORE_MOVIES`;
export const CHANGE_MOVIES_ACTIVE_GENRE = `CHANGE_MOVIES_ACTIVE_GENRE`;

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
export const changeMoviesActiveGenre = (genre) => {
  return {type: CHANGE_MOVIES_ACTIVE_GENRE, payload: genre};
};

/**
 * Сохранить полный список фильмов
 * @param {Object[]} movies Список фильмов
 * @return {Object}
 */
export const storeMovies = (movies) => {
  return {type: STORE_MOVIES, payload: movies};
};

/**
 * Получить полный список фильмов
 * @return {Object}
 */
export const loadMovies = () => {
  return (dispath, getState, api) => {
    return api.fetchMovies().then((movies) => {
      dispath(storeMovies(movies));
    });
  };
};


export const initialState = {
  /** Фильтр списка фильмов по жанру */
  activeGenre: ALL_GENRES_GROUP,
  /** Список фильмов */
  movies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MOVIES_ACTIVE_GENRE:
      return {...state, activeGenre: action.payload};
    case STORE_MOVIES:
      return {...state, movies: action.payload};
    default:
      return state;
  }
};
