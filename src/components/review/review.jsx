import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {MovieReviewPropTypes} from "../../prop-types";

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function Review({className, review = {}}) {
  const {id, comment, author, datetime, date, rating} = review;

  return (
    <div id={`review-${id}`} className={cn(`review`, className)}>
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime={datetime}>
            {date}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">
        {isNumeric(rating) ? rating.toFixed(1) : rating}
      </div>
    </div>
  );
}

Review.propTypes = {
  /** Объект ревью */
  review: MovieReviewPropTypes,
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
};

export default Review;
