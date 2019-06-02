import React from "react";
import PropTypes from "prop-types";

function PageTitle({className, children}) {
  const titleClassName = className ? ` ${className}` : ``;
  return (
    <h1 className={`page-title${titleClassName}`}>
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
