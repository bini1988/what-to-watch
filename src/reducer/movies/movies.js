import {ALL_GENRES_GROUP} from "./selectors";

export const ActionTypes = {
  CHANGE_ACTIVE_GENRE: `CHANGE_ACTIVE_GENRE`,
  STORE_MOVIES: `STORE_MOVIES`,
  STORE_MY_LIST_MOVIES: `STORE_MY_LIST_MOVIES`,
  STORE_PROMO_MOVIE: `STORE_PROMO_MOVIE`,
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
   * Сохранить список фильмов
   * @param {Object[]} movies Список фильмов
   * @return {Object}
   */
  storeMovies: (movies) => {
    return {type: ActionTypes.STORE_MOVIES, payload: movies};
  },
  /**
   * Сохранить список фильмов
   * @param {Object[]} movies Список фильмов
   * @return {Object}
   */
  storeMyMovies: (movies) => {
    return {type: ActionTypes.STORE_MOVIES, payload: movies};
  },
  /**
   * Сохранить промо фильм
   * @param {Object} movie Промо фильм
   * @return {Object}
   */
  storePromoMovie: (movie) => {
    return {type: ActionTypes.STORE_PROMO_MOVIE, payload: movie};
  },
  /**
   * Сохранить фильмы добавленные в список «к просмотру»
   * @param {Object} movie Промо фильм
   * @return {Object}
   */
  storeMyListMovies: (movie) => {
    return {type: ActionTypes.STORE_MY_LIST_MOVIES, payload: movie};
  },
};

export const Operation = {
  /**
   * Получить список фильмов
   * @return {Promise}
   */
  fetchMovies: () => {
    return (dispath, getState, api) => {
      return api.fetchMovies().then((movies) => {
        return dispath(ActionCreator.storeMovies(movies));
      });
    };
  },
  /**
   * Получить текущий промо фильм
   * @return {Promise}
   */
  fetchPromoMovie: () => {
    return (dispath, getState, api) => {
      return api.fetchPromoMovie().then((movie) => {
        return dispath(ActionCreator.storePromoMovie(movie));
      });
    };
  },
  /**
   * Получить список фильмов добавленных в список «к просмотру»
   * @return {MovieCard[]}
   */
  fetchMyListMovies: () => {
    return (dispath, getState, api) => {
      return api.fetchMyListMovies().then((movies) => {
        return dispath(ActionCreator.storeMyListMovies(movies));
      });
    };
  },
};

export const initialState = {
  /** Промо фильм */
  promoItem: undefined,
  /** Массив фильмов из списка «к просмотру» */
  myListItems: [],
  /** Фильтр списка фильмов по жанру */
  activeGenre: ALL_GENRES_GROUP,
  /** Список фильмов */
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_ACTIVE_GENRE:
      return {...state, activeGenre: action.payload};
    case ActionTypes.STORE_MOVIES:
      return {...state, items: action.payload};
    case ActionTypes.STORE_PROMO_MOVIE:
      return {...state, promoItem: action.payload};
    case ActionTypes.STORE_MY_LIST_MOVIES:
      return {...state, myListItems: action.payload};
    default:
      return state;
  }
};
