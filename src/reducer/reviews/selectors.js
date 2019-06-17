import NameSpace from "../name-spaces";

/**
 * Получение объекта данных хранимых отзывов к фильмам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getReviews = (state) => {
  return state[NameSpace.Reviews];
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
