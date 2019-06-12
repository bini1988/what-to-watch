import React from "react";
import {connect} from "react-redux";
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

  const mapStateToProps = (state) => {
    return {hasAuth: isAuthenticated(state)};
  };

  return connect(mapStateToProps)(WithRouteAuth);
};

export default withRouteAuth;
