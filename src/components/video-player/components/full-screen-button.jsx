import React from "react";
import PropTypes from "prop-types";

function FullScreenButton(props) {
  return (
    <button
      {...props}
      type="button"
      className="player__full-screen">
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"/>
      </svg>
      <span>{`Full screen`}</span>
    </button>
  );
}

FullScreenButton.propTypes = {
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default FullScreenButton;
