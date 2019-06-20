import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../reducer/user/selectors";

const withRouteAuth = (Component) => {
  function WithRouteAuth({hasAuth, ...props}) {
    const {location} = props;
    const currentLocation = location && location.pathname;

    return hasAuth ? (
      <Component {...props}/>
    ) : (
      <Redirect
        to={{
          pathname: `/login`,
          state: {referrer: currentLocation},
        }}/>
    );
  }

  WithRouteAuth.propTypes = Component.propTypes;

  return WithRouteAuth;
};

const mapStateToProps = (state) => {
  return {hasAuth: isAuthenticated(state)};
};

export {withRouteAuth};
export default compose(
    connect(mapStateToProps),
    withRouteAuth
);
