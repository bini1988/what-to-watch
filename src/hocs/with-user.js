import {connect} from "react-redux";
import {getUserData} from "../reducer/user/selectors";

const mapStateToProps = (state) => {
  return {user: getUserData(state)};
};

export default connect(mapStateToProps, {});

