import React from "react";
import PropTypes from "prop-types";

function HeroHeader({background, title, renderHeader, children}) {
  return (
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={background} alt={title}/>
      </div>
      {renderHeader && renderHeader({className: `movie-card__head`})}
      <div className="movie-card__wrap">
        {children}
      </div>
    </div>
  );
}

HeroHeader.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Название фильма */
  title: PropTypes.string,
  /** Постер к фильму */
  poster: PropTypes.string,
  /** Оформление к фильму */
  background: PropTypes.string,
  /** Рендер функция шапки карточки */
  renderHeader: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default HeroHeader;
