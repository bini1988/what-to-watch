import React from "react";
import PropTypes from "prop-types";

function PauseButton(props) {
  return (
    <button
      {...props}
      type="button"
      className="player__play">
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"/>
      </svg>
      <span>{`Play`}</span>
    </button>
  );
}

PauseButton.propTypes = {
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default PauseButton;
