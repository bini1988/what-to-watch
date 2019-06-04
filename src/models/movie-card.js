
/**
 * Карточка фильма
 * @class
 * @param {Object} data
 */
function MovieCard(data = {}) {
  // TODO: Надо ли писать на это тесты?
  this.id = data.id;
  this.title = data.name;
  this.genre = data.genre;
  this.year = data.released;

  this.images = {};
  this.images.preview = data.preview_image;
  this.images.poster = data.poster_image;
  this.images.background = data.background_image;

  this.trailer = data.video_link;
}

export default MovieCard;
