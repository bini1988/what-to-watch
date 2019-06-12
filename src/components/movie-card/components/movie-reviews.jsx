import React from "react";
import {MovieCardPropTypes} from "../../../prop-types";

function MovieReviews({card = {}}) {
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {`Col1 ${card.title}`}
      </div>
      <div className="movie-card__reviews-col">
        {`Col2`}
      </div>
    </div>
  );
}

MovieReviews.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default MovieReviews;
