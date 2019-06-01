import axios from "axios";
import MovieCard from "./models/movie-card";

export const axiosInstance = axios.create({
  baseURL: `https://es31-server.appspot.com/wtw`,
  timeout: 5000,
  withCredentials: true,
});

/**
 * Получить список фильмов
 * @return {Object[]}
 */
export const fetchMovies = () => {
  return axiosInstance.get(`/films`).then((responce) => {
    return responce.data.map((it) => new MovieCard(it));
  });
};

export default axiosInstance;
