import React from "react";
import PropTypes from "prop-types";

function UserBlock({user, onSignIn}) {
  return (
    <div className="user-block">
      {user ? (
        <div className="user-block__avatar">
          <img
            alt={user.name}
            src={user.avatar}
            width="63"
            height="63"/>
        </div>
      ) : (
        <a
          className="user-block__link"
          href="/sign-in"
          onClick={onSignIn}>
          {`Sign in`}
        </a>
      )}
    </div>
  );
}

UserBlock.propTypes = {
  /** Данные пользователя */
  user: PropTypes.shape({
    id: PropTypes.number,
    /** Email пользователя */
    email: PropTypes.string,
    /** Имя пользователя */
    name: PropTypes.string,
    /** Аватар пользователя */
    avatar: PropTypes.string,
  }),
  /** Авторизовать пользователя */
  onSignIn: PropTypes.func,
};

export default UserBlock;
