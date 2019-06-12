import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function InfoWrapper({translate, children}) {
  return (
    <div className={cn(
        `movie-card__wrap`,
        {"movie-card__translate-top": translate},
    )}>
      <div className="movie-card__info">
        {children}
      </div>
    </div>
  );
}

InfoWrapper.propTypes = {
  /** Сместить содержимое вверх */
  translate: PropTypes.bool,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default InfoWrapper;
