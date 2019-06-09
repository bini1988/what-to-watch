import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withActiveElement, {withActiveElementPropTypes} from "../../hocs/with-active-element";

function MoviesCatalog(props) {
  const {movies, moviesGenres, activeGenre, onGenreChange, onMoviesMore} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">
        {`Catalog`}
      </h2>
      <GenresList
        genres={moviesGenres}
        activeGenre={activeGenre}
        onGenreChange={onGenreChange}/>
      <div className="catalog__movies-list">
        {movies.map((it = {}) => (
          <SmallMovieCard
            key={it.id}
            card={it}
            onMouseEnter={props.setActiveElement}
            onMouseLeave={props.resetActiveElement}/>
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
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: PropTypes.func,
  /** Получить следующие элементы списка */
  onMoviesMore: PropTypes.func,
  /** HOC пропсы */
  ...withActiveElementPropTypes,
};

export {MoviesCatalog};
export default withActiveElement(MoviesCatalog);
