
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
  this.img = data.preview_image;
  this.trailer = data.video_link;
}

export default MovieCard;
