import React from "react";
import PropTypes from "prop-types";

function UserBlock({user = {}, children}) {
  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img
          alt={user.name}
          src={user.avatar}
          width="63"
          height="63"/>
      </div>
      {children}
    </div>
  );
}

UserBlock.propTypes = {
  /** Данные пользователя */
  user: PropTypes.shape({
    /** Имя пользователя */
    name: PropTypes.string,
    /** Аватар пользователя */
    avatar: PropTypes.string,
  }),
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default UserBlock;
