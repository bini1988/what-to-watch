import React from "react";
import PropTypes from "prop-types";

function Description({title, genre, year, children}) {
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
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Название фильма */
  title: PropTypes.string,
  /** Жанр фильма */
  genre: PropTypes.string,
  /** Год выхода */
  year: PropTypes.number,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Description;
