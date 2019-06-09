import React from "react";
import {MovieCardPropTypes} from "../../../prop-types";
import MovieRating from "../../movie-rating/movie-rating";

function MovieOverview({card = {}}) {
  const {rating, description, director, starring = []} = card;

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
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default MovieOverview;
