import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {card, onTitleClick, onMoviePlay = () => {}} = props;
  const {id, title, img} = card;

  return (
    <article
      className="small-movie-card catalog__movies-card">
      <button
        className="small-movie-card__play-btn"
        type="button"
        onClick={() => onMoviePlay(card)}>
        {`Play`}
      </button>
      <div className="small-movie-card__image">
        <img
          src={img}
          alt={title}
          width="280"
          height="175"/>
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}>
        <a
          className="small-movie-card__link"
          href={`/film/${id}`}>
          {title}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  /** Карточка фильма */
  card: PropTypes.shape({
    /** id фильма */
    id: PropTypes.string.isRequired,
    /** Название фильма */
    title: PropTypes.string.isRequired,
    /** Путь к постеру фильма */
    img: PropTypes.string,
  }).isRequired,
  /** Обрабочик события клика по заголовку фильма */
  onTitleClick: PropTypes.func,
  /** Обрабочик события клика по заголовку фильма */
  onMoviePlay: PropTypes.func,
};

export default SmallMovieCard;
