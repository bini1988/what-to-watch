import React from "react";
import PropTypes from "prop-types";

function MovieCard({card, children}) {
  const {title, images, genre, year} = card;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={images.background} alt={title} />
      </div>
      {children}
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={images.poster} alt={title} width="218" height="327"/>
          </div>
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{year}</span>
            </p>
            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>{`Play`}</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"/>
                </svg>
                <span>{`My list`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

MovieCard.propTypes = {
  /** Карточка фильма */
  card: PropTypes.shape({
    /** id фильма */
    id: PropTypes.number.isRequired,
    /** Название фильма */
    title: PropTypes.string.isRequired,
    /** Жанр фильма */
    genre: PropTypes.string,
    /** Год выхода */
    year: PropTypes.number,
    /** Набор изображений фильма */
    images: PropTypes.shape({
      /** Превью к трейлеру фильма */
      preview: PropTypes.string,
      /** Постер к фильму */
      poster: PropTypes.string,
      /** Оформление к фильму */
      background: PropTypes.string,
    }),
    /** Путь к трейлеру фильма */
    trailer: PropTypes.string,
  }).isRequired,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default MovieCard;
