import React from "react";
import {MovieCardPropTypes} from "../../../prop-types";

function MovieDetails({card = {}}) {
  const {director, starring = [], genre, year, duration} = card;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">{`Director`}</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">{`Starring`}</strong>
          <span className="movie-card__details-value">
            {starring.map((name, index) => (
              <React.Fragment key={name}>
                {`${name}${!(starring.length - index - 1) || `,`}`}<br/>
              </React.Fragment>
            ))}
          </span>
        </p>
      </div>
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">{`Run Time`}</strong>
          <span className="movie-card__details-value">{duration}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">{`Genre`}</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">{`Released`}</strong>
          <span className="movie-card__details-value">{year}</span>
        </p>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default MovieDetails;
