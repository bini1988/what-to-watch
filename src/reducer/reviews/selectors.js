import NameSpace from "../name-spaces";

/**
 * Получение таблицы отзывов к фильмам
 * @param {Object} state Текущее состояние redux стора
 * @return {Object[]}
 */
export const getReviews = (state) => {
  return state[NameSpace.Reviews].items;
};
