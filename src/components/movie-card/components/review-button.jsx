import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function ReviewButton({...props}) {
  return (
    <Link {...props}
      className="btn movie-card__button">
      {`Add review`}
    </Link>
  );
}

ReviewButton.propTypes = {
  /** Ссылка на ревью */
  to: PropTypes.string,
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default ReviewButton;
