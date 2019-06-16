import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import GenresList from "../genres-list/genres-list.jsx";

function MoviesCatalog(props) {
  const {title, likeThis, movies, moviesGenres, activeGenre, limit, onGenreChange, onMoviesMore} = props;
  const limitedMovies = (limit > 0)
    ? movies.slice(0, limit) : movies;

  return (
    <section className={cn(`catalog`, {"catalog--like-this": likeThis})}>
      <h2 className={cn(`catalog__title`, {"visually-hidden": !title})}>
        {title || `Catalog`}
      </h2>
      <GenresList
        genres={moviesGenres}
        activeGenre={activeGenre}
        onGenreChange={onGenreChange}/>
      <div className="catalog__movies-list">
        {limitedMovies.map((it = {}) => (
          <SmallMovieCard
            key={it.id}
            card={it}
            className="catalog__movies-card"/>
        ))}
      </div>
      {(typeof onMoviesMore === `function`) && (
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={onMoviesMore}>
            {`Show more`}
          </button>
        </div>
      )}
    </section>
  );
}

MoviesCatalog.defaultProps = {
  movies: [],
  moviesGenres: [],
  activeGenre: `All genres`,
};
MoviesCatalog.propTypes = {
  /** Отображаемый заголовок */
  title: PropTypes.string,
  /** Отображение похожих фильмов */
  likeThis: PropTypes.bool,
  /** Список отображаемых фильмов */
  movies: PropTypes.arrayOf(
      SmallMovieCard.propTypes.card,
  ),
  /** Список отображаемых жанров фильмов */
  moviesGenres: PropTypes.arrayOf(
      PropTypes.string,
  ),
  /** Активный жанр фильмов */
  activeGenre: PropTypes.string,
  /** Максимальное количество отображаемых фильмов */
  limit: PropTypes.number,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: PropTypes.func,
  /** Получить следующие элементы списка */
  onMoviesMore: PropTypes.func,
};

export default MoviesCatalog;
