import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import WTWLogo from "../wtw-logo/wtw-logo";

function PageHeader({className, children}) {
  return (
    <header className={cn(`page-header`, className)}>
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
