import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

/**
 * Получение объекта данных хранимых отзывов к фильмам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getReviews = (state) => {
  return state[NameSpace.REVIEWS];
};

/**
 * Получение Map-объекта отзывов
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getReviewsItems = (state) => {
  return getReviews(state).items;
};

/**
 * Получить список id's отзывов к фильму
 * @param {Object} state Текущее состояние redux стора
 * @param {number} id Id фильма
 * @return {Object}
 */
export const getMovieReviewsIds = (state, id) => {
  return getReviews(state).movieToItems[id];
};

/**
 * Получить список отзывов к фильму
 * @param {Object} state Текущее состояние redux стора
 * @param {number} id Id фильма
 * @return {Object}
 */
export const getMovieReviewsById = createSelector(
    [getMovieReviewsIds, getReviewsItems],
    (reviewsIds = [], items) => {
      return reviewsIds
        .map((id) => items[id])
        .sort((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime);
        });
    },
);

