import React from "react";
import PropTypes from "prop-types";

function MovieRating({rating = {}}) {
  const {score, count, level} = rating;
  return (
    <div className="movie-rating">
      <div className="movie-rating__score">
        {score}
      </div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">
          {level}
        </span>
        <span className="movie-rating__count">
          {`${count} ratings`}
        </span>
      </p>
    </div>
  );
}

MovieRating.propTypes = {
  rating: PropTypes.shape({
    /** Оценка фильма */
    score: PropTypes.number.isRequired,
    /** Уровень оценки фильма */
    level: PropTypes.string.isRequired,
    /** Количество голосов за фильм */
    count: PropTypes.number.isRequired,
  }),
};

export default MovieRating;
