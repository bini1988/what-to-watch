import NameSpace from "../name-spaces";
import {getUser, isAuthenticated, getUserData, getAuthError} from "./selectors";
import {initialState} from "./user";

const mockStore = {
  [NameSpace.User]: {...initialState},
};

describe(`User Selectors`, () => {
  it(`should return user state`, () => {
    expect(getUser(mockStore))
      .toEqual(initialState);
  });
  it(`should return is user authenticated state`, () => {
    expect(isAuthenticated(mockStore))
      .toEqual(initialState.isAuthenticated);
  });
  it(`should return user data`, () => {
    expect(getUserData(mockStore))
      .toEqual(initialState.data);
  });
  it(`should return user auth error`, () => {
    expect(getAuthError(mockStore))
      .toEqual(initialState.error);
  });
});
