import React from "react";
import PropTypes from "prop-types";
import {compose} from "redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import withUser from "../../hocs/with-user";

function UserBlock({user, location}) {
  const currentLocation = location && location.pathname;

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
          to={{
            pathname: `/login`,
            state: {referrer: currentLocation},
          }}>
          {`Sign in`}
        </Link>
      )}
    </div>
  );
}

UserBlock.propTypes = {
  /** Redux Route location */
  location: PropTypes.object,
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

export {UserBlock};
export default compose(withRouter, withUser)(UserBlock);
