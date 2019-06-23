import React from "react";
import PropTypes from "prop-types";
import {MovieReviewPropTypes} from "../../../prop-types";
import Review from "../../review/review";

const COLUMNS_COUNT = 2;

function MovieReviews({reviews = []}) {
  const rowsCount = Math.ceil(reviews.length / COLUMNS_COUNT);
  const renderRview = (review, index) => (
    <Review key={index} review={review}/>
  );

  return (
    <div className="movie-card__reviews movie-card__row">
      {(reviews.length > 1) ? (
        <React.Fragment>
          <div className="movie-card__reviews-col">
            {reviews.slice(0, rowsCount).map(renderRview)}
          </div>
          <div className="movie-card__reviews-col">
            {reviews.slice(rowsCount).map(renderRview)}
          </div>
        </React.Fragment>
      ) : (
        reviews.map(renderRview)
      )}
    </div>
  );
}

MovieReviews.propTypes = {
  /** Отзывы к фильму */
  reviews: PropTypes.arrayOf(
      MovieReviewPropTypes,
  ),
};

export default MovieReviews;
