import React from "react";
import PropTypes from "prop-types";

function WTWLogo({href, mode}) {
  const modeClass = mode ? ` logo__link--${mode}` : ``;
  return (
    <div className="logo">
      <a className={`logo__link${modeClass}`} href={href}>
        <span className="logo__letter logo__letter--1">{`W`}</span>
        <span className="logo__letter logo__letter--2">{`T`}</span>
        <span className="logo__letter logo__letter--3">{`W`}</span>
      </a>
    </div>
  );
}

WTWLogo.defaultProps = {
  href: `/`,
};
WTWLogo.propTypes = {
  /** Ссылка */
  href: PropTypes.string,
  /** Модификатор отображения логотипа */
  mode: PropTypes.oneOf([
    `light`,
  ])
};

export default WTWLogo;
