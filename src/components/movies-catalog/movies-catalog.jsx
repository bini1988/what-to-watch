import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

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
    const {films = []} = this.props;

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
          {films.map((it = {}) => (
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
  /** Список отображаемых фильмов */
  films: PropTypes.arrayOf(
      PropTypes.shape({
        /** id фильма */
        id: PropTypes.string.isRequired,
        /** Название фильма */
        title: PropTypes.string.isRequired,
        /** Путь к постеру фильма */
        img: PropTypes.string,
      })
  ).isRequired,
};

export default MoviesCatalog;
