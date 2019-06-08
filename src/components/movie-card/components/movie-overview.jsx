import React from "react";
import PropTypes from "prop-types";
import MovieRating from "../../movie-rating/movie-rating";

function MovieOverview(props) {
  const {rating, description, director, starring = []} = props;

  return (
    <React.Fragment>
      <MovieRating rating={rating}/>
      <div className="movie-card__text">
        {description}
        <p className="movie-card__director">
          <strong>{`Director: ${director}`}</strong>
        </p>
        <p className="movie-card__starring">
          <strong>
            {`Starring: ${starring.join(`, `)} and other`}
          </strong>
        </p>
      </div>
    </React.Fragment>
  );
}

MovieOverview.propTypes = {
  /** Рейтинг фильма */
  rating: MovieRating.propTypes.rating,
  /** Описание фильма */
  description: PropTypes.string,
  /** Режисер фильма */
  director: PropTypes.string,
  /** Актерский состав */
  starring: PropTypes.arrayOf(
      PropTypes.string,
  ),
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default MovieOverview;
