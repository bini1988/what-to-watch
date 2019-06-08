import React from "react";
import PropTypes from "prop-types";
import Button from "../../button/button";

function ListButton(props) {
  return (
    <Button {...props}
      className="movie-card__button"
      label="My list"
      mode="list"/>
  );
}

ListButton.propTypes = {
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default ListButton;
