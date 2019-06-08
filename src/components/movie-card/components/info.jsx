import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Info({topTranslate, children}) {
  return (
    <div className={cn(
        `movie-card__wrap`,
        {"movie-card__translate-top": topTranslate},
    )}>
      <div className="movie-card__info">
        {children}
      </div>
    </div>
  );
}

Info.propTypes = {
  /** Сместить содержимое вверх */
  topTranslate: PropTypes.bool,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Info;
