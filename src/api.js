import axios from "axios";
import MovieCard from "./models/movie-card";
import MovieReview from "./models/movie-review";
import User from "./models/user";

const isFunction = (value) => typeof value === `function`;
const injectErrorHandler = (handler) => {
  return (error) => {
    handler(error);
    return Promise.reject(error);
  };
};

export const createApi = (options = {}) => {
  const {url: baseURL, timeout = 5000, withCredentials = true} = options;
  const axiosInstance = axios.create({baseURL, timeout, withCredentials});

  const handleSuccess = isFunction(options.onSuccess)
    ? options.onSuccess : undefined;
  const handleError = isFunction(options.onError)
    ? injectErrorHandler(options.onError) : undefined;

  axiosInstance.interceptors.response.use(handleSuccess, handleError);

  return {
    getInstance() {
      return axiosInstance;
    },
    /**
     * Получить список фильмов
     * @return {MovieCard[]}
     */
    fetchMovies() {
      return axiosInstance.get(`/films`).then((responce) => {
        return responce.data.map((it) => new MovieCard(it));
      });
    },
    /**
     * Получить текущий промо фильм
     * @return {MovieCard}
     */
    fetchPromoMovie() {
      return axiosInstance.get(`/films/promo`).then((responce) => {
        return new MovieCard(responce.data);
      });
    },
    /**
     * Получить список фильмов добавленных в список «к просмотру»
     * @return {MovieCard[]}
     */
    fetchMyListMovies() {
      return axiosInstance.get(`/favorite`).then((responce) => {
        return responce.data.map((it) => new MovieCard(it));
      });
    },
    /**
     * Добавить фильм в список «к просмотру»
     * @param {number} id ID фильма
     * @return {MovieCard}
     */
    addMovieToMyList(id) {
      return axiosInstance.post(`/favorite/${id}/1`).then((responce) => {
        return new MovieCard(responce.data);
      });
    },
    /**
     * Удалить фильм из списка «к просмотру».
     * @param {number} id ID фильма
     * @return {MovieCard}
     */
    deleteMovieFromMyList(id) {
      return axiosInstance.post(`/favorite/${id}/0`).then((responce) => {
        return new MovieCard(responce.data);
      });
    },
    /**
     * Получить список отзывов к фильму
     * @param {number} id ID фильма
     * @return {MovieReview[]}
     */
    fetchMovieReviews(id) {
      return axiosInstance.get(`/comments/${id}`).then((responce) => {
        return responce.data.map((it) => new MovieReview(it));
      });
    },
    /**
     * Опубликовать отзыв к фильму
     * @param {number} id ID фильма
     * @param {Object} review Отзыв к фильму
     * @param {number} review.rating Оценка фильма
     * @param {string} review.comment Текст отзыва
     * @return {MovieReview[]}
     */
    postMovieReview(id, review) {
      return axiosInstance.post(`/comments/${id}`, review).then((responce) => {
        return responce.data.map((it) => new MovieReview(it));
      });
    },
    /**
     * Авторизовать пользователя
     * @param {Object} params Параметры авторизации
     * @param {string} params.email E-mail пользователя
     * @param {string} params.password Пароль пользователя
     * @return {User}
     */
    loginUser(params) {
      return axiosInstance.post(`/login`, params).then((responce) => {
        return new User(responce.data);
      });
    },
    /**
     * Проверить аторизован ли текущий пользователь
     * @return {User}
     */
    echoUser() {
      return axiosInstance.get(`/login`).then((responce) => {
        return new User(responce.data);
      });
    },
  };
};
