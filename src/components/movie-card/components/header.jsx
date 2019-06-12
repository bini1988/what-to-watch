import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {MovieCardPropTypes} from "../../../prop-types";

function Header({card = {}, className, component, children}) {
  const {title, images = {}} = card;
  const Wrapper = component
    ? component : `div`;
  const wrapperClass = component
    ? `movie-card__head` : `movie-card__header`;

  return (
    <Wrapper className={cn(wrapperClass, className)}>
      <div className="movie-card__bg">
        <img
          src={images.background}
          alt={title}/>
      </div>
      {children}
    </Wrapper>
  );
}

Header.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Компонет переопредяющий обёртку для содержимого Header */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Header;
