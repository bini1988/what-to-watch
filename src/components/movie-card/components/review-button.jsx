import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {MovieCardPropTypes} from "../../../prop-types";

function ReviewButton({card = {}, ...props}) {
  return (
    <Link {...props}
      to={`film/${card.id}/review`}
      className="btn movie-card__button">
      {`Add review`}
    </Link>
  );
}

ReviewButton.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Ссылка на ревью */
  to: PropTypes.string,
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default ReviewButton;
