import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {MovieCardPropTypes} from "../../../prop-types";

function PlayButton({card = {}, ...props}) {
  return (
    <Link {...props}
      to={`/film/${card.id}/player`}
      className="btn btn--play movie-card__button">
      <svg
        viewBox="0 0 19 19"
        width={19}
        height={19}>
        <use xlinkHref="#play-s"/>
      </svg>
      <span>{`Play`}</span>
    </Link>
  );
}

PlayButton.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default PlayButton;
