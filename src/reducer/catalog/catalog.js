import {ALL_GENRES_GROUP} from "./selectors";

export const initialState = {
  /** Фильтр списка фильмов по жанру */
  activeGenre: ALL_GENRES_GROUP,
  /** Список фильмов */
  movies: [],
};

export const ActionTypes = {
  STORE_MOVIES: `STORE_MOVIES`,
  CHANGE_MOVIES_ACTIVE_GENRE: `CHANGE_MOVIES_ACTIVE_GENRE`,
};

/**
 * Изменить фильтр списка фильмов по жанру
 * @param {string} genre Жанр фильма
 * @return {Object}
 */
export const changeMoviesActiveGenre = (genre) => {
  return {type: ActionTypes.CHANGE_MOVIES_ACTIVE_GENRE, payload: genre};
};

/**
 * Сохранить полный список фильмов
 * @param {Object[]} movies Список фильмов
 * @return {Object}
 */
export const storeMovies = (movies) => {
  return {type: ActionTypes.STORE_MOVIES, payload: movies};
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

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_MOVIES_ACTIVE_GENRE:
      return {...state, activeGenre: action.payload};
    case ActionTypes.STORE_MOVIES:
      return {...state, movies: action.payload};
    default:
      return state;
  }
};
