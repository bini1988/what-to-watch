import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

export const ALL_GENRES_GROUP = `All genres`;

/**
 * Сгруппировать массив фильмов по жанрам
 * @param {Object[]} movies Массив элементов
 * @return {Object}
 */
const groupByGenres = (movies) => {
  const genresGroups = {[ALL_GENRES_GROUP]: movies};

  return movies.reduce((out, it) => {
    out[it.genre] = out[it.genre] || [];
    out[it.genre].push(it);

    return out;
  }, genresGroups);
};

/**
 * Получение списка фильмов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getMovies = (state) => {
  return state[NameSpace.Movies].items;
};

/**
 * Получение фильма по id
 * @param {Object} state Текущее состояние redux стора
 * @param {string} id Id фильма
 * @return {Object[]}
 */
export const getMovieById = (state, id) => {
  return state[NameSpace.Movies].items.find((it = {}) => it.id === +id);
};

/**
 * Получить текущий промо фильм
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getPromoMovie = (state) => {
  return state[NameSpace.Movies].promoItem;
};

/**
 * Получить список фильмов добавленных в список «к просмотру»
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getMyListMovies = (state) => {
  return state[NameSpace.Movies].myListItems;
};

/**
 * Получение активного жанра
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getActiveGenre = (state) => {
  return state[NameSpace.Movies].activeGenre;
};

/**
 * Получение списка фильмов сгруппированног по жанрам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object}
 */
export const getMoviesByGenres = createSelector(getMovies, groupByGenres);
