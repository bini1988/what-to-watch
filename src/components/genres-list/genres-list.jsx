import React from "react";
import PropTypes from "prop-types";

export const GenresList = ({genres = [], activeGenre, onGenreChange}) => {
  const withActiveClass = (genre) =>
    genre === activeGenre ? `catalog__genres-item--active` : ``;
  const hanldeClickWith = (genre) => (event) => {
    event.preventDefault();
    onGenreChange(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((it) => (
        <li key={it} className={`catalog__genres-item ${withActiveClass(it)}`}>
          <a
            className="catalog__genres-link"
            onClick={hanldeClickWith(it)}>
            {it}
          </a>
        </li>
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  /** Список жаров фильмов */
  genres: PropTypes.arrayOf(
      PropTypes.string
  ),
  /** Активный фильтр жанра */
  activeGenre: PropTypes.string,
  /** Изменить активный фильтр жанра */
  onGenreChange: PropTypes.func,
};

export default GenresList;
