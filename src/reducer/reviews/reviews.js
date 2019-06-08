
export const ActionTypes = {
  ADD_REVIEWS: `ADD_REVIEWS`,
};

/**
 * Сохранить список отзывов к фильму
 * @param {number} id ID фильма
 * @param {Object[]} reviews Список отзывов
 * @return {Object}
 */
export const addReviews = (id, reviews) => {
  return {type: ActionTypes.ADD_REVIEWS, meta: {id}, payload: reviews};
};

/**
 * Получить список отзывов к фильму
 * @param {number} id ID фильма
 * @return {Promise}
 */
export const fetchMovieReviews = (id) => {
  return (dispath, getState, api) => {
    return api.fetchMovieReviews(id)
      .then((reviews) => {
        dispath(addReviews(id, reviews));
      });
  };
};

/**
 * Опубликовать отзыв к фильму
 * @param {number} id ID фильма
 * @param {Object} review Отзыв к фильму
 * @param {number} review.rating Оценка фильма
 * @param {string} review.comment Текст отзыва
 * @return {Promise}
 */
export const submitMovieReview = (id, review) => {
  return (dispath, getState, api) => {
    return api.submitMovieReview(id, review)
      .then((reviews) => {
        dispath(addReviews(id, reviews));
      });
  };
};

export const initialState = {
  /** Map-объект отзывов */
  items: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_REVIEWS:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
