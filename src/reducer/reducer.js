import {combineReducers} from "redux";
import NameSpaces from "./name-spaces";

import user from "./user/user";
import movies from "./movies/movies";
import genres from "./genres/genres";
import reviews from "./reviews/reviews";

export default combineReducers({
  [NameSpaces.User]: user,
  [NameSpaces.Movies]: movies,
  [NameSpaces.Genres]: genres,
  [NameSpaces.Reviews]: reviews,
});
