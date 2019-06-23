import movies from "./movies";

export default {
  "All genres": movies,
  "Action": [
    movies[0],
    movies[2],
  ],
  "Crime": [
    movies[1],
  ],
  "Comedy": [
    movies[3],
  ],
  "Fantasy": [
    movies[4],
  ],
};

export const moviesIdsByGenres = {
  "All genres": movies.map((it) => it.id),
  "Action": [
    movies[0].id,
    movies[2].id,
  ],
  "Crime": [
    movies[1].id,
  ],
  "Comedy": [
    movies[3].id,
  ],
  "Fantasy": [
    movies[4].id,
  ],
};
