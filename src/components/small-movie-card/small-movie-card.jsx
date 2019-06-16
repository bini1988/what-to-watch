import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import cn from "classnames";
import {MovieCardPropTypes} from "../../prop-types";
import withVideoPlayer, {withVideoPlayerPropTypes} from "../../hocs/with-video-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {className, card, renderPlayer} = this.props;
    const {id, title, images = {}, trailer} = card;

    return (
      <article
        id={`movie-${id}`}
        className={cn(`small-movie-card`, className)}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <Link
          className="small-movie-card__link"
          to={`/film/${id}`}>
          <div className="small-movie-card__image">
            {renderPlayer({
              src: trailer,
              poster: images.preview,
              muted: true,
              width: 280,
              height: 175,
              preload: `none`,
            })}
          </div>
          <h3 className="small-movie-card__title">
            {title}
          </h3>
        </Link>
      </article>
    );
  }

  _handleMouseEnter() {
    this.props.onPlayerPlay();
  }

  _handleMouseLeave() {
    this.props.onPlayerStop();
  }
}

SmallMovieCard.defaultProps = {
  renderPlayer: () => null,
  onPlayerPlay: () => {},
  onPlayerStop: () => {},
};

SmallMovieCard.propTypes = {
  /** Пропсы withVideoPlayer HOC */
  ...withVideoPlayerPropTypes,
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
};

export {SmallMovieCard};
export default withVideoPlayer({autoPlayTimeout: 500})(SmallMovieCard);
