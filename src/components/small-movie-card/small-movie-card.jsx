import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import withPlayer, {withPlayerPropTypes} from "../../hocs/with-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {card, renderPlayer} = this.props;
    const {id, title, images, trailer} = card;

    return (
      <article
        id={`movie-${id}`}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <div className="small-movie-card__image">
          {renderPlayer({
            src: trailer,
            poster: images.preview,
            muted: true,
          })}
        </div>
        <h3 className="small-movie-card__title">
          <Link
            className="small-movie-card__link"
            to={`/film/${id}`}>
            {title}
          </Link>
        </h3>
      </article>
    );
  }

  _handleMouseEnter() {
    const {card, onPlayerPlay, onMouseEnter} = this.props;

    onPlayerPlay();
    onMouseEnter(card);
  }

  _handleMouseLeave() {
    const {card, onPlayerPause, onMouseLeave} = this.props;

    onPlayerPause();
    onMouseLeave(card);
  }
}

SmallMovieCard.defaultProps = {
  renderPlayer: () => null,
  onPlayerPlay: () => {},
  onPlayerPause: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

SmallMovieCard.propTypes = {
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
  /** Обрабочик события курсор мыши на элементе */
  onMouseEnter: PropTypes.func,
  /** Обрабочик события курсор мыши покинул элемент */
  onMouseLeave: PropTypes.func,
  /** Пропсы withPlayer HOC */
  ...withPlayerPropTypes,
};

export {SmallMovieCard};
export default withPlayer({autoPlayTimeout: 500})(SmallMovieCard);
