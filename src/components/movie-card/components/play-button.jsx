import React from "react";
import PropTypes from "prop-types";
import Button from "../../button/button";

function PlayButton(props) {
  return (
    <Button {...props}
      className="movie-card__button"
      label="Play"
      mode="play"/>
  );
}

PlayButton.propTypes = {
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default PlayButton;
