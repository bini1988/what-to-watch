
export const ActionTypes = {
  STORE_REVIEWS: `STORE_REVIEWS`,
};

export const ActionCreator = {
  /**
   * Сохранить список отзывов к фильму
   * @param {number} id ID фильма
   * @param {Object[]} reviews Список отзывов
   * @return {Object}
   */
  storeReviews: (id, reviews) => {
    return {type: ActionTypes.STORE_REVIEWS, meta: {id}, payload: reviews};
  },
};

export const Operation = {
  /**
   * Получить список отзывов к фильму
   * @param {number} id ID фильма
   * @return {Promise}
   */
  fetchMovieReviews: (id) => {
    return (dispath, getState, api) => {
      return api.fetchMovieReviews(id)
        .then((reviews) => {
          dispath(ActionCreator.storeReviews(id, reviews));
        });
    };
  },
  /**
   * Опубликовать отзыв к фильму
   * @param {number} id ID фильма
   * @param {Object} review Отзыв к фильму
   * @param {number} review.rating Оценка фильма
   * @param {string} review.comment Текст отзыва
   * @return {Promise}
   */
  submitMovieReview: (id, review) => {
    return (dispath, getState, api) => {
      return api.submitMovieReview(id, review)
        .then((reviews) => {
          dispath(ActionCreator.storeReviews(id, reviews));
        });
    };
  },
};


export const initialState = {
  /** Массив отзывов */
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_REVIEWS:
      return {...state, items: action.payload};
    default:
      return state;
  }
};
