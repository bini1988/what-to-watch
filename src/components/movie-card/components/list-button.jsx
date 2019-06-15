import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

function ListButton({card = {}, ...props}) {
  const {isInList} = card;

  return (
    <button
      {...props}
      className="btn btn--list movie-card__button"
      type="button">
      {isInList ? (
        <svg viewBox="0 0 18 14" width={18} height={14}>
          <use xlinkHref="#in-list"/>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width={19} height={20}>
          <use xlinkHref="#add"/>
        </svg>
      )}
      <span>{`My list`}</span>
    </button>
  );
}

ListButton.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Обработчик события клика */
  onClick: PropTypes.any,
};

export default ListButton;
