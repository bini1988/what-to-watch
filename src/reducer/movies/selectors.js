import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

/**
 * Получение объекта данных хранимых фильмов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getMovies = (state = {}) => {
  return state[NameSpace.MOVIES] || state;
};

/**
 * Получение Map-объекта фильмов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getMoviesItems = (state) => {
  return getMovies(state).items;
};

/**
 * Получение фильма по id
 * @param {Object} state Текущее состояние redux стора
 * @param {number} id Id фильма
 * @return {Object}
 */
export const getMovieById = (state, id) => {
  const items = getMoviesItems(state);
  return items && items[id];
};

/**
 * Получить текущий промо фильм
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getPromoMovie = (state) => {
  const {promoMovieId} = getMovies(state);
  return getMovieById(state, promoMovieId);
};

/**
 * Получить список фильмов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getMoviesList = createSelector(
    getMovies,
    ({itemsIds, items}) => {
      return itemsIds.map((id) => items[id]);
    }
);

/**
 * Получить список фильмов добавленных в список «к просмотру»
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getMyListMovies = createSelector(
    getMovies,
    ({myListMoviesIds, items}) => {
      return myListMoviesIds.map((id) => items[id]);
    }
);
