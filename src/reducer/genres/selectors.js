import {createSelector} from "reselect";
import NameSpace from "../name-spaces";
import {getMovieById, getMoviesItems} from "../movies/selectors";

export const MAX_ITEMS_PER_PAGE = 20;

/**
 * Получение объекта данных хранимых жанров фильмов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getGenres = (state = {}) => {
  return state[NameSpace.Genres] || state;
};

/**
 * Получение активного жанра
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getActiveGenre = (state) => {
  return getGenres(state).activeGenre;
};

/**
 * Получение списка id's фильмов сгруппированных по жанрам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getMoviesGenres = (state) => {
  return getGenres(state).items;
};

/**
 * Получение списка id's фильмов заданного жанра
 * @param {Object} state Текущее состояние redux стора
 * @param {string} genre Жанр фильма
 * @return {string[]}
 */
export const getMoviesIdsByGenre = (state, genre) => {
  const moviesByGenre = getMoviesGenres(state);
  return moviesByGenre && moviesByGenre[genre];
};

/**
 * Получение списка фильмов заданного жанра
 * @param {Object} state Текущее состояние redux стора
 * @param {string} genre Жанр фильма
 * @return {Object[]}
 */
export const getMoviesByGenre = createSelector(
    [getMoviesItems, getMoviesIdsByGenre],
    (items, itemsIds = []) => {
      return itemsIds.map((id) => items[id]);
    },
);

/**
 * Получение списка жанров
 * @param {Object} state Текущее состояние redux стора
 * @return {string[]}
 */
export const getMoviesGenresList = createSelector(
    getMoviesGenres,
    (genres = {}) => {
      const GENRES_LIMIT = 10;
      return Object.keys(genres).slice(0, GENRES_LIMIT);
    }
);

/**
 * Получение списка похожих по жанру фильмов
 * @param {Object} state Текущее состояние redux стора
 * @param {number} id Id фильма
 * @return {Object[]}
 */
export const getMoviesGenreLike = createSelector(
    [getMoviesGenres, getMovieById, getMoviesItems],
    (genres, movie = {}, items) => {
      const MOVIES_LIMIT = 4;
      const itemsIds = genres[movie.genre] || [];
      return itemsIds
        .filter((id) => id !== movie.id)
        .map((id) => items[id])
        .slice(0, MOVIES_LIMIT);
    }
);

/**
 * Получение пагинации заданного жанра
 * @param {Object} state Текущее состояние redux стора
 * @param {string} genre Жанр фильма
 * @return {Object[]}
 */
export const getLimitByGenre = (state, genre) => {
  const {items, limits} = getGenres(state);

  if (items && items[genre]) {
    const {[genre]: limit = MAX_ITEMS_PER_PAGE} = limits;
    return limit;
  }
  return MAX_ITEMS_PER_PAGE;
};
