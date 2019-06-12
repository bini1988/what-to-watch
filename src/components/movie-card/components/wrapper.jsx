import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Wrapper({main, children}) {
  return (
    <div className={cn(
        {"movie-card__wrap": !main},
        {"movie-card__hero": main},
    )}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  /** Основная обёртка */
  main: PropTypes.bool,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Wrapper;
