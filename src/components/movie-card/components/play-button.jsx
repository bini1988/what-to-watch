import React from "react";
import {Link} from "react-router-dom";
import {MovieCardPropTypes} from "../../../prop-types";

function PlayButton({card = {}}) {
  return (
    <Link
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
};

export default PlayButton;
