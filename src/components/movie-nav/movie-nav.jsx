import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function Item({label, active, href}) {
  return (
    <li className={cn(
        `movie-nav__item`,
        {"movie-nav__item--active": active},
    )}>
      <a className="movie-nav__link" href={href}>
        {label}
      </a>
    </li>
  );
}

Item.propTypes = {
  /** Подпись к элементу */
  label: PropTypes.string,
  /** Активная ссылка */
  active: PropTypes.bool,
  /** Ссылка */
  href: PropTypes.string,
};

function MovieNav({className, children}) {
  return (
    <nav className={cn(`movie-nav`, className)}>
      <ul className="movie-nav__list">
        {children}
      </ul>
    </nav>
  );
}

MovieNav.Item = Item;
MovieNav.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Вложенные элемнты */
  children: PropTypes.any,
};

export default MovieNav;
