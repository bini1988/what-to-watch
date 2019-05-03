import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const MoviesCatalog = (props) => {
  const {items = []} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">
        {`Catalog`}
      </h2>
      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a href="#" className="catalog__genres-link">{`All genres`}</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link">{`Others`}</a>
        </li>
      </ul>
      <div className="catalog__movies-list">
        {items.map((it, index) => (
          <SmallMovieCard key={index} title={it}/>
        ))}
      </div>
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          {`Show more`}
        </button>
      </div>
    </section>
  );
};

MoviesCatalog.propTypes = {
  /** Список отображаемых фильмов */
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MoviesCatalog;
