import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {MovieCardPropTypes} from "../../../prop-types";

function Poster({card = {}, mode}) {
  const {title, images = {}} = card;

  return (
    <div className={cn(
        `movie-card__poster`,
        {[`movie-card__poster--${mode}`]: mode}
    )}>
      <img
        src={images.poster}
        alt={title}
        width="218"
        height="327"/>
    </div>
  );
}

Poster.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Модификатор постера */
  mode: PropTypes.oneOf([
    `small`, `big`
  ])
};

export default Poster;
