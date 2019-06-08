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
