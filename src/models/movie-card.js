
/**
 * Текстовые представления оценки фильма
 */
export const RatingLevels = {
  "Bad": [0, 3],
  "Normal": [3, 5],
  "Good": [5, 8],
  "Very good": [8, 10],
  "Awesome": [10, 10],
};

/**
 * Возвращает текстовое представление оценки фильма
 * @param {number} score Оценка фильма
 * @return {string}
 */
export function getRatingLevel(score) {
  const level = Object.entries(RatingLevels)
    .find(([, range]) => {
      const [min, max] = range;
      return (score >= min) && (score < max);
    });

  return Array.isArray(level)
    ? level[0] : `Unknown`;
}

/**
 * Карточка фильма
 * @class
 * @param {Object} data
 */
function MovieCard(data = {}) {
  this.id = data.id;
  this.title = data.name;
  this.genre = data.genre;
  this.year = data.released;

  this.images = {};
  this.images.preview = data.preview_image;
  this.images.poster = data.poster_image;
  this.images.background = data.background_image;

  this.trailer = data.video_link;

  this.rating = {};
  this.rating.score = data.rating;
  this.rating.level = getRatingLevel(data.rating);
  this.rating.count = data.scores_count;
}

export default MovieCard;
