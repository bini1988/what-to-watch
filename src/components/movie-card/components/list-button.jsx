import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

function ListButton({card = {}, onToMyListToggle}) {
  const {id, isInList} = card;

  return (
    <button
      type="button"
      className="btn btn--list movie-card__button"
      onClick={() => {
        onToMyListToggle(id);
      }}>
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
  /** Добавить/удалить фильм из списока «к просмотру» */
  onToMyListToggle: PropTypes.func,
};

export default ListButton;
