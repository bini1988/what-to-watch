import axios from "axios";
import MovieCard from "./models/movie-card";
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
     * @return {Object[]}
     */
    fetchMovies() {
      return axiosInstance.get(`/films`).then((responce) => {
        return responce.data.map((it) => new MovieCard(it));
      });
    },
    /**
     * Авторизовать пользователя
     * @param {Object} params Параметры авторизации
     * @param {string} params.email E-mail пользователя
     * @param {string} params.password Пароль пользователя
     * @return {Object}
     */
    loginUser(params) {
      return axiosInstance.post(`/login`, params).then((responce) => {
        return new User(responce.data);
      });
    }
  };
};
