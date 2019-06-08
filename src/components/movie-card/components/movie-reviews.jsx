import React from "react";
import PropTypes from "prop-types";

function MovieReviews({children}) {
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {"Col1"}
      </div>
      <div className="movie-card__reviews-col">
        {"Col2"}
      </div>
    </div>
  );
}

MovieReviews.propTypes = {
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default MovieReviews;
