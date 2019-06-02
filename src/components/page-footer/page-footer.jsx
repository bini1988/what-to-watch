import React from "react";
import PropTypes from "prop-types";
import WTWLogo from "../wtw-logo/wtw-logo.jsx";

function PageFooter({children}) {
  return (
    <footer className="page-footer">
      <WTWLogo mode="light"/>
      <div className="copyright">
        <p>{`© 2019 What to watch Ltd.`}</p>
      </div>
      {children}
    </footer>
  );
}

PageFooter.propTypes = {
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default PageFooter;
