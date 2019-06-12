import React from "react";
import {MovieRatingPropTypes} from "../../prop-types";

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
  rating: MovieRatingPropTypes,
};

export default MovieRating;
