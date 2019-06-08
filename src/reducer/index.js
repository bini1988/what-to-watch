import {combineReducers} from "redux";
import NameSpaces from "./name-spaces";

import user from "./user/user";
import movies from "./movies/movies";
import reviews from "./reviews/reviews";

export default combineReducers({
  [NameSpaces.User]: user,
  [NameSpaces.Movies]: movies,
  [NameSpaces.Reviews]: reviews,
});
