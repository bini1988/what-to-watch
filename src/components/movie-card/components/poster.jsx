import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Poster({title, poster, mode}) {
  return (
    <div className={cn(
        `movie-card__poster`,
        {[`movie-card__poster--${mode}`]: mode}
    )}>
      <img src={poster} alt={title} width="218" height="327"/>
    </div>
  );
}

Poster.propTypes = {
  /** Название фильма */
  title: PropTypes.string,
  /** Постер к фильму */
  poster: PropTypes.string,
  /** Модификатор постера */
  mode: PropTypes.oneOf([
    `small`, `big`
  ])
};

export default Poster;
