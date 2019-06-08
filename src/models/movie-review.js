
/**
 * Отзыв к фильму
 * @class
 * @param {Object} data
 */
function MovieReview(data = {}) {
  this.id = data.id;
  this.author = data.user && data.user.name;
  this.rating = data.rating;
  this.text = data.comment;
  this.datetime = data.date;
  this.date = data.date;
}

export default MovieReview;
