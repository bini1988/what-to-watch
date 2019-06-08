import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Review({className, review = {}}) {
  const {id, text, author, date, rating} = review;

  return (
    <div id={`review-${id}`} className={cn(`review`, className)}>
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>
        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime={date}>
            {(new Date(date)).toDateString()}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">
        {rating}
      </div>
    </div>
  );
}

Review.propTypes = {
  /** Объект ревью */
  review: PropTypes.shape({
    id: PropTypes.number,
    /** Текст ревью */
    text: PropTypes.string,
    /** Автор */
    author: PropTypes.string,
    /** Дата */
    date: PropTypes.string,
    /** Рейтинг */
    rating: PropTypes.number,
  }),
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
};

export default Review;
