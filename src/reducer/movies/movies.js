import {NotificationManager} from "react-notifications";
import {normalizeItems} from "../../utils";
import {Operation as GenresOperation} from "../genres/genres";
import {getMovieById} from "./selectors";

export const ActionTypes = {
  STORE_MOVIES: `STORE_MOVIES`,
  STORE_MY_LIST_MOVIES: `STORE_MY_LIST_MOVIES`,
  STORE_MOVIE: `STORE_MOVIE`,
};

export const ActionCreator = {
  /**
   * Сохранить список фильмов
   * @param {Object} items Map-объект фильмов
   * @param {string[]} itemsIds Список ids фильмов
   * @return {Object}
   */
  storeMovies: (items, itemsIds) => {
    return {
      type: ActionTypes.STORE_MOVIES,
      meta: {itemsIds},
      payload: items
    };
  },
  /**
   * Сохранить фильм
   * @param {Object} movie Фильм
   * @param {Object} [isPromo] Является ли фильм промо
   * @return {Object}
   */
  storeMovie: (movie = {}, isPromo = false) => {
    return {
      type: ActionTypes.STORE_MOVIE,
      meta: {id: movie.id, isPromo},
      payload: movie
    };
  },
  /**
   * Сохранить список фильмов «к просмотру»
   * @param {Object} items Map-объект фильмов
   * @param {string[]} itemsIds Список ids фильмов
   * @return {Object}
   */
  storeMyListMovies: (items, itemsIds) => {
    return {
      type: ActionTypes.STORE_MY_LIST_MOVIES,
      meta: {itemsIds},
      payload: items
    };
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
        const {items, itemsIds} = normalizeItems(movies);

        dispath(ActionCreator.storeMovies(items, itemsIds));
        dispath(GenresOperation.storeMoviesGenres(movies));
      }).catch((error) => {
        NotificationManager.error(error.message);
      });
    };
  },
  /**
   * Получить фильм с указанным id
   * @param {number} id Индентификатор фильма
   * @return {Promise}
   */
  fetchMovie: (id) => {
    return (dispath, getState) => {
      const state = getState();
      const movie = getMovieById(state, id);

      if (!movie) {
        return dispath(Operation.fetchMovies());
      }

      return Promise.resolve(movie);
    };
  },
  /**
   * Получить текущий промо фильм
   * @return {Promise}
   */
  fetchPromoMovie: () => {
    return (dispath, getState, api) => {
      return api.fetchPromoMovie().then((movie) => {
        return dispath(ActionCreator.storeMovie(movie, true));
      }).catch((error) => {
        NotificationManager.error(error.message);
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
        const {items, itemsIds} = normalizeItems(movies);

        return dispath(
            ActionCreator.storeMyListMovies(items, itemsIds)
        );
      }).catch((error) => {
        NotificationManager.error(error.message);
      });
    };
  },
  /**
   * Добавить/удалить фильм из списка «к просмотру»
   * @param {number} id Индентификатор фильма
   * @return {MovieCard}
   */
  toggleMovieToMyList: (id) => {
    return (dispath, getState, api) => {
      const state = getState();
      const item = getMovieById(state, id);

      if (item && item.id) {
        const methodName = item.isInList
          ? `deleteMovieFromMyList`
          : `addMovieToMyList`;

        return api[methodName](id).then((movie) => {
          return dispath(ActionCreator.storeMovie(movie));
        }).catch((error) => {
          NotificationManager.error(error.message);
        });
      }

      return Promise.reject(`Unknown movie id`);
    };
  },
};

export const initialState = {
  /** id промо фильма */
  promoMovieId: null,
  /** Массив фильмов из списка «к просмотру» */
  myListMoviesIds: [],
  /** Массив id's cписка фильмов */
  itemsIds: [],
  /** Map-объект фильмов */
  items: {},
};

export default (state = initialState, action = {}) => {
  const {type, meta, payload} = action;

  switch (type) {
    case ActionTypes.STORE_MOVIES:
      return {
        ...state,
        itemsIds: meta.itemsIds,
        items: {...state.items, ...payload},
      };
    case ActionTypes.STORE_MOVIE:
      return {
        ...state,
        promoMovieId: meta.isPromo
          ? meta.id : state.promoMovieId,
        items: {...state.items, [meta.id]: payload},
      };
    case ActionTypes.STORE_MY_LIST_MOVIES:
      return {
        ...state,
        myListMoviesIds: meta.itemsIds,
        items: {...state.items, ...payload},
      };
    default:
      return state;
  }
};
