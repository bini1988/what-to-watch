import {normalizeItems} from "../../utils";

export const ActionTypes = {
  STORE_REVIEWS: `STORE_REVIEWS`,
};

export const ActionCreator = {
  /**
   * Сохранить список отзывов к фильму
   * @param {number} id ID фильма
   * @param {Object} items Map-объект отзывов
   * @param {string[]} itemsIds Список id's отзывов
   * @return {Object}
   */
  storeReviews: (id, items, itemsIds) => {
    return {type: ActionTypes.STORE_REVIEWS, meta: {id, itemsIds}, payload: items};
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
          const {items, itemsIds} = normalizeItems(reviews);
          dispath(ActionCreator.storeReviews(id, items, itemsIds));
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
          const {items, itemsIds} = normalizeItems(reviews);
          dispath(ActionCreator.storeReviews(id, items, itemsIds));
        });
    };
  },
};


export const initialState = {
  /** Map-объект фильм -> массив отзывов */
  movieToItems: {},
  /** Map-объект отзывов */
  items: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_REVIEWS:
      return {
        ...state,
        movieToItems: {
          ...state.movieToItems,
          [action.meta.id]: action.meta.itemsIds,
        },
        items: {
          ...state.items,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
