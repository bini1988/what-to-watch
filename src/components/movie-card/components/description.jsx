import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

function Description({card = {}, children}) {
  const {title, genre, year} = card;

  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{title}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre}</span>
        <span className="movie-card__year">{year}</span>
      </p>
      <div className="movie-card__buttons">
        {children}
      </div>
    </div>
  );
}

Description.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Description;
