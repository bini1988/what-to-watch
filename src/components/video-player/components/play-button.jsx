import React from "react";
import PropTypes from "prop-types";

function PlayButton(props) {
  return (
    <button
      {...props}
      type="button"
      className="player__play">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>{`Play`}</span>
    </button>
  );
}

PlayButton.propTypes = {
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default PlayButton;
