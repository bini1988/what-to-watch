
/**
 * Отзыв к фильму
 * @class
 * @param {Object} data
 */
function MovieReview(data = {}) {
  this.id = data.id;
  this.author = data.user && data.user.name;
  this.rating = data.rating;
  this.comment = data.comment;
  this.datetime = data.date;

  const date = new Date(this.datetime);
  const dateYear = date.getFullYear();
  const dateDay = date.getDate();
  const dateMonth = date.toLocaleString(`en-us`, {month: `long`});

  this.date = `${dateMonth} ${dateDay}, ${dateYear}`;
}

export default MovieReview;
