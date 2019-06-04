import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withActiveElement, {withActiveElementPropTypes} from "../../hocs/with-active-element";

function MoviesCatalog(props) {
  const {moviesGenreGroups = {}, activeGenre, onGenreChange, onMoviesMore, setActiveElement, resetActiveElement} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">
        {`Catalog`}
      </h2>
      <GenresList
        genres={Object.keys(moviesGenreGroups)}
        activeGenre={activeGenre}
        onGenreChange={onGenreChange}/>
      <div className="catalog__movies-list">
        {moviesGenreGroups[activeGenre].map((it = {}) => (
          <SmallMovieCard
            key={it.id}
            card={it}
            onMouseEnter={setActiveElement}
            onMouseLeave={resetActiveElement}/>
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

MoviesCatalog.propTypes = {
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: PropTypes.objectOf(
      PropTypes.arrayOf(
          SmallMovieCard.propTypes.card
      )
  ),
  /** Активный жанр */
  activeGenre: PropTypes.string,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: PropTypes.func,
  /** Получить следующие элементы списка */
  onMoviesMore: PropTypes.func,
  ...withActiveElementPropTypes,
};

export {MoviesCatalog};
export default withActiveElement(MoviesCatalog);
