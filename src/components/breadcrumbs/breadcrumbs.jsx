import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Breadcrumbs({children}) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {children}
      </ul>
    </nav>
  );
}

export function Item({label, href}) {
  const Component = href ? Link : `a`;

  return (
    <li className="breadcrumbs__item">
      <Component
        className="breadcrumbs__link"
        to={href}>
        {label}
      </Component>
    </li>
  );
}

Item.propTypes = {
  /** Подпись к ссылке */
  label: PropTypes.string,
  /** Ссылка */
  href: PropTypes.string,
};

Breadcrumbs.Item = Item;
Breadcrumbs.propTypes = {
  children: PropTypes.arrayOf(
      PropTypes.element
  ),
};

export default Breadcrumbs;
