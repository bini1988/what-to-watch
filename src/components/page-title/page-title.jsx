import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function PageTitle({className, children}) {
  return (
    <h1 className={cn(`page-title`, className)}>
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Вложенные элементы заголовка */
  children: PropTypes.any,
};

export default PageTitle;
