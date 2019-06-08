import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const IconsProps = {
  play: {
    xlinkHref: `#play-s`,
    viewBox: `0 0 19 19`,
    width: 19,
    height: 19,
  },
  list: {
    xlinkHref: `#add`,
    viewBox: `0 0 19 20`,
    width: 19,
    height: 20,
  },
  inlist: {
    xlinkHref: `#in-list`,
    viewBox: `0 0 18 14`,
    width: 18,
    height: 14,
  },
};

function Button({className, label, mode, children, onClick}) {
  const iconProps = IconsProps[mode];

  return (
    <button
      className={cn(`btn`, {[`btn--${mode}`]: mode}, className)}
      type="button"
      onClick={onClick}>
      {iconProps && (
        <svg
          viewBox={iconProps.viewBox}
          width={iconProps.width}
          height={iconProps.height}>
          <use xlinkHref={iconProps.xlinkHref}/>
        </svg>
      )}
      <span>{label}</span>
      {children}
    </button>
  );
}

Button.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Подпись к кнопке */
  label: PropTypes.string,
  /** Модификатор кнопки */
  mode: PropTypes.oneOf([
    `play`, `list`, `inlist`
  ]),
  /** Обработчик события клика */
  onClick: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default Button;
