import React from "react";
import PropTypes from "prop-types";
import Poster from "./poster";

function Header({background, poster, title, children}) {
  return (
    <div className="movie-card__header">
      <div className="movie-card__bg">
        <img src={background} alt={title}/>
      </div>
      {children}
      <Poster mode="small" title={title} poster={poster}/>
    </div>
  );
}

Header.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Название фильма */
  title: PropTypes.string.isRequired,
  /** Постер к фильму */
  poster: PropTypes.string,
  /** Оформление к фильму */
  background: PropTypes.string,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Header;
