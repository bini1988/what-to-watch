import {groupItemsBy} from "../../utils";
import {MAX_ITEMS_PER_PAGE, getGenres} from "./selectors";

export const ALL_GENRES_GROUP = `All genres`;

export const ActionTypes = {
  STORE_GENRES: `STORE_GENRES`,
  CHANGE_ACTIVE_GENRE: `CHANGE_ACTIVE_GENRE`,
  CHANGE_GENRE_LIMIT: `CHANGE_GENRE_LIMIT`,
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
   * Задать максимальное кол-во возвращемых для заданного жанра фильмов
   * @param {string} genre Жанр фильма
   * @param {number} limit Кол-во элементов
   * @return {Object}
   */
  changeGenreLimit: (genre, limit) => {
    return {type: ActionTypes.CHANGE_GENRE_LIMIT, meta: {genre}, payload: limit};
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
  /**
   * Увеличить максимальное ко-во возвращемых для заданного жанра фильмов
   * @param {string} genre Жанр фильма
   * @return {Object}
   */
  increaseGenreLimit: (genre) => {
    return (dispath, getState) => {
      const state = getState();
      const {items, limits} = getGenres(state);

      if (items[genre]) {
        const {[genre]: prevLimit = MAX_ITEMS_PER_PAGE} = limits;
        const limit = Math.min(
            items[genre].length,
            prevLimit + MAX_ITEMS_PER_PAGE,
        );
        dispath(ActionCreator.changeGenreLimit(genre, limit));
      }
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
      return {...state, activeGenre: payload, limits: {}};
    case ActionTypes.CHANGE_GENRE_LIMIT:
      return {...state, limits: {...state.limits, [meta.genre]: payload}};
    default:
      return state;
  }
};
