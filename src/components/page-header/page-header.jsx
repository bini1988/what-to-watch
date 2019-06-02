import React from "react";
import PropTypes from "prop-types";
import WTWLogo from "../wtw-logo/wtw-logo.jsx";

function PageHeader({className, children}) {
  const headerClassName = className ? ` ${className}` : ``;
  return (
    <header className={`page-header${headerClassName}`}>
      <WTWLogo/>
      {children}
    </header>
  );
}

PageHeader.propTypes = {
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default PageHeader;
