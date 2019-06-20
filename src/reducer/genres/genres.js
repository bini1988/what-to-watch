import {groupItemsBy} from "../../utils";
import {ActionTypes as MoviesActionTypes} from "../movies/movies";

export const MAX_ITEMS_PER_PAGE = 20;
export const ALL_GENRES_GROUP = `All genres`;

export const ActionTypes = {
  STORE_GENRES: `STORE_GENRES`,
  CHANGE_ACTIVE_GENRE: `CHANGE_ACTIVE_GENRE`,
  INCREASE_GENRE_LIMIT: `INCREASE_GENRE_LIMIT`,
};

export const ActionCreator = {
  /**
   * Сохранить набор жанров
   * @param {Object} genres Набор жанров
   * @return {Object}
   */
  storeGenres: (genres) => {
    return {type: ActionTypes.STORE_GENRES, payload: genres};
  },
  /**
   * Изменить фильтр по жанру
   * @param {string} genre Жанр фильма
   * @return {Object}
   */
  changeActiveGenre: (genre) => {
    return {type: ActionTypes.CHANGE_ACTIVE_GENRE, payload: genre};
  },
  /**
   * Увеличить максимальное ко-во возвращемых для заданного жанра фильмов
   * @param {string} genre Жанр фильма
   * @return {Object}
   */
  increaseGenreLimit: (genre) => {
    return {type: ActionTypes.INCREASE_GENRE_LIMIT, payload: genre};
  },
};

export const Operation = {
  /**
   * Сохранить набор жанров переданных фильмов
   * @param {Object[]} movies Список фильмов
   * @return {Object}
   */
  storeMoviesGenres: (movies) => {
    return (dispath) => {
      const toId = (it) => it.id;
      const moviesIds = movies.map(toId);
      const moviesIdsByGenres = groupItemsBy(movies, `genre`, toId);
      const genres = {
        [ALL_GENRES_GROUP]: moviesIds, ...moviesIdsByGenres,
      };

      dispath(ActionCreator.storeGenres(genres));
    };
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
    case ActionTypes.STORE_GENRES:
      return {...initialState, items: payload};
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
