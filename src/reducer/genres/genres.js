import {ActionTypes as MoviesActionTypes} from "../movies/movies";

export const MAX_ITEMS_PER_PAGE = 20;
export const ALL_GENRES_GROUP = `All genres`;

export const ActionTypes = {
  CHANGE_ACTIVE_GENRE: `CHANGE_ACTIVE_GENRE`,
  INCREASE_GENRE_LIMIT: `INCREASE_GENRE_LIMIT`,
};

export const ActionCreator = {
  /**
   * Изменить фильтр списка фильмов по жанру
   * @param {string} genre Жанр фильма
   * @return {Object}
   */
  changeActiveGenre: (genre) => {
    return {type: ActionTypes.CHANGE_ACTIVE_GENRE, payload: genre};
  },
  /**
   * Получить следующий набор фильмов соответвующего жанра
   * @param {string} genre Жанр фильма
   * @return {Object}
   */
  increaseGenreLimit: (genre) => {
    return {type: ActionTypes.INCREASE_GENRE_LIMIT, payload: genre};
  },
};

export const initialState = {
  /** Активный жанр */
  activeGenre: ALL_GENRES_GROUP,
  /** Количество отображаемых по жанрам фильмов */
  limits: {},
  /** Map-объект жанров */
  items: {},
};

export default (state = initialState, action = {}) => {
  const {type, meta, payload} = action;

  switch (type) {
    case MoviesActionTypes.STORE_MOVIES:
      return {
        ...state,
        items: {
          [ALL_GENRES_GROUP]: meta.itemsIds,
          ...meta.itemsByGenre,
        },
      };
    case ActionTypes.CHANGE_ACTIVE_GENRE:
      return {...state, activeGenre: payload};
    case ActionTypes.INCREASE_GENRE_LIMIT:
      return {
        ...state,
        limits: {
          ...state.limits,
          [payload]: Math.min(
              state.items[payload].length,
              (state.limits[payload] || MAX_ITEMS_PER_PAGE) + MAX_ITEMS_PER_PAGE,
          ),
        },
      };
    default:
      return state;
  }
};
