import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

function ListButton({card = {}, onToMyListAdd}) {
  const {id, isInList} = card;
  const handleOnClick = () => {
    if (!isInList) {
      onToMyListAdd(id);
    }
  };

  return (
    <button
      type="button"
      className="btn btn--list movie-card__button"
      onClick={handleOnClick}>
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
  /** Добавить фильм в список «к просмотру» */
  onToMyListAdd: PropTypes.func,
};

export default ListButton;
