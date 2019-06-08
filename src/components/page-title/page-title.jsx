import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function PageTitle(props) {
  const {className, hidden, children} = props;
  return (
    <h1 className={cn(
        `page-title`,
        {"visually-hidden": hidden},
        className
    )}>
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Скрыть текст*/
  hidden: PropTypes.bool,
  /** Вложенные элементы заголовка */
  children: PropTypes.any,
};

export default PageTitle;
