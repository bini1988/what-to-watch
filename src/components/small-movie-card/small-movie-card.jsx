import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import withPlayer, {withPlayerProps} from "../../hocs/with-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {card, renderPlayer} = this.props;
    const {id, title, img, trailer} = card;

    return (
      <article
        id={id}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <div className="small-movie-card__image">
          {renderPlayer({
            src: trailer,
            poster: img,
            muted: true,
          })}
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href={`/film/${id}`}>
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _handleMouseEnter() {
    const {card, autoPlayTimeout, onPlayerPlay, onMouseEnter} = this.props;

    onPlayerPlay(autoPlayTimeout);
    onMouseEnter(card);
  }

  _handleMouseLeave() {
    const {card, onPlayerPause, onMouseLeave} = this.props;

    onPlayerPause();
    onMouseLeave(card);
  }
}

SmallMovieCard.defaultProps = {
  autoPlayTimeout: 500,
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
    id: PropTypes.string.isRequired,
    /** Название фильма */
    title: PropTypes.string.isRequired,
    /** Жанр фильма */
    genre: PropTypes.string,
    /** Путь к постеру фильма */
    img: PropTypes.string,
    /** Путь к трейлеру фильма */
    trailer: PropTypes.string,
  }).isRequired,
  /** Таймаут автовоспроизведения трейлера фильма, мс */
  autoPlayTimeout: PropTypes.number,
  /** Обрабочик события курсор мыши на элементе */
  onMouseEnter: PropTypes.func,
  /** Обрабочик события курсор мыши покинул элемент */
  onMouseLeave: PropTypes.func,
  /** Пропсы withPlayer HOC */
  ...withPlayerProps,
};

export {SmallMovieCard};
export default withPlayer(SmallMovieCard);
