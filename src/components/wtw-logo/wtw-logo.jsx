import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import cn from "classnames";

function WTWLogo({mode}) {
  return (
    <div className="logo">
      <Link to="/" className={cn(`logo__link`, {[`logo__link--${mode}`]: mode})}>
        <span className="logo__letter logo__letter--1">{`W`}</span>
        <span className="logo__letter logo__letter--2">{`T`}</span>
        <span className="logo__letter logo__letter--3">{`W`}</span>
      </Link>
    </div>
  );
}

WTWLogo.propTypes = {
  /** Ссылка */
  href: PropTypes.string,
  /** Модификатор отображения логотипа */
  mode: PropTypes.oneOf([
    `light`,
  ])
};

export default WTWLogo;
