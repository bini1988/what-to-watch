import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function UserBlock({user}) {
  return (
    <div className="user-block">
      {user ? (
        <div className="user-block__avatar">
          <Link to="/mylist">
            <img
              alt={user.name}
              src={user.avatar}
              width="63"
              height="63"/>
          </Link>
        </div>
      ) : (
        <Link
          className="user-block__link"
          to="/login">
          {`Sign in`}
        </Link>
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
};

export default UserBlock;
