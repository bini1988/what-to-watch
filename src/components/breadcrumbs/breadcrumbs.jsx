import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Breadcrumbs({items = []}) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {items.map((it = {}, index) => {
          const Component = it.href ? Link : `a`;
          return (
            <li className="breadcrumbs__item" key={index}>
              <Component
                className="breadcrumbs__link"
                to={it.href}>
                {it.label}
              </Component>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  /** Массив ссылок */
  items: PropTypes.arrayOf(
      PropTypes.shape({
        /** Подпись к ссылке */
        label: PropTypes.string,
        /** Ссылка */
        href: PropTypes.string,
      }),
  ),
};

export default Breadcrumbs;
