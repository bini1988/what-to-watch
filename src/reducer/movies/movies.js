import {normalizeItems, groupItemsBy} from "../../utils";
import {getMovieById} from "./selectors";

export const ActionTypes = {
  CHANGE_ACTIVE_GENRE: `CHANGE_ACTIVE_GENRE`,
  STORE_MOVIES: `STORE_MOVIES`,
  STORE_MY_LIST_MOVIES: `STORE_MY_LIST_MOVIES`,
  STORE_MOVIE: `STORE_MOVIE`,
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
    const {items, itemsIds} = normalizeItems(movies);
    const itemsByGenre = groupItemsBy(movies, `genre`, ({id}) => id);

    return {
      type: ActionTypes.STORE_MOVIES,
      meta: {itemsIds, itemsByGenre},
      payload: items
    };
  },
  /**
   * Сохранить фильм
   * @param {Object} movie Фильм
   * @param {Object} [isPromo] Является ли фильм промо
   * @return {Object}
   */
  storeMovie: (movie, isPromo = false) => {
    const id = movie && movie.id;
    return {type: ActionTypes.STORE_MOVIE, meta: {id, isPromo}, payload: movie};
  },
  /**
   * Сохранить список фильмов «к просмотру»
   * @param {Object[]} movies Список фильмов
   * @return {Object}
   */
  storeMyListMovies: (movies) => {
    const {items, itemsIds} = normalizeItems(movies);
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
        dispath(ActionCreator.storeMovies(movies));
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
  /**
   * Добавить фильм в список «к просмотру»
   * @param {number} id ID фильма
   * @return {MovieCard}
   */
  addMovieToMyList: (id) => {
    return (dispath, getState, api) => {
      return api.addMovieToMyList(id).then((movie) => {
        return dispath(ActionCreator.storeMovie(movie));
      });
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
    case ActionTypes.CHANGE_ACTIVE_GENRE:
      return {...state, activeGenre: payload};
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
