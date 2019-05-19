import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import GenresList from "../genres-list/genres-list.jsx";

class MoviesCatalog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this._setActiveCard = this._setActiveCard.bind(this);
    this._resetActiveCard = this._resetActiveCard.bind(this);
  }

  render() {
    const {moviesGenreGroups = {}, activeGenre, onGenreChange} = this.props;

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
              onMouseEnter={this._setActiveCard}
              onMouseLeave={this._resetActiveCard}/>
          ))}
        </div>
        <div className="catalog__more">
          <button className="catalog__button" type="button">
            {`Show more`}
          </button>
        </div>
      </section>
    );
  }

  _setActiveCard(card) {
    this.setState({activeCard: card});
  }

  _resetActiveCard() {
    this.setState({activeCard: null});
  }
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
};

export default MoviesCatalog;
