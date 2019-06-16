import React from "react";
import {MovieCardPropTypes} from "../../../prop-types";
import Review from "../../review/review";

function MovieReviews({card = {}}) {
  const {reviews = []} = card;
  const COLUMNS_COUNT = 2;
  const firstCount = Math.ceil(reviews.length / COLUMNS_COUNT);
  const renderRview = (review, index) => (
    <Review key={index} review={review}/>
  );

  return (
    <div className="movie-card__reviews movie-card__row">
      {(reviews.length > 1) ? (
        <React.Fragment>
          <div className="movie-card__reviews-col">
            {reviews.slice(0, firstCount).map(renderRview)}
          </div>
          <div className="movie-card__reviews-col">
            {reviews.slice(firstCount).map(renderRview)}
          </div>
        </React.Fragment>
      ) : (
        reviews.map(renderRview)
      )}
    </div>
  );
}

MovieReviews.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default MovieReviews;
