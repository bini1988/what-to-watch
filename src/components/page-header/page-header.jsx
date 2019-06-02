import React from "react";
import PropTypes from "prop-types";
import WTWLogo from "../wtw-logo/wtw-logo.jsx";

function PageHeader({children}) {
  return (
    <header className="page-header">
      <WTWLogo/>
      {children}
    </header>
  );
}

PageHeader.propTypes = {
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default PageHeader;
