import reducer, {initialState, requireAuthorization, unauthorizeUser, authorizeUser, loginUser} from "./user";

describe(`User Reducer`, () => {
  it(`should set isAuthorizationRequired state by requireAuthorization`, () => {
    const isAuthorizationRequired = true;
    const action = requireAuthorization();

    expect(reducer(initialState, action))
      .toEqual({...initialState, isAuthorizationRequired});
  });
  it(`should set profile null state by unauthorizeUser`, () => {
    const profile = null;
    const action = unauthorizeUser();

    expect(reducer(initialState, action))
      .toEqual({...initialState, profile});
  });
  it(`should set profile state by authorizeUser`, () => {
    const profile = {user: `user`};
    const action = authorizeUser(profile);

    expect(reducer(initialState, action))
      .toEqual({...initialState, profile});
  });
  it(`should make login API request and call authorizeUser`, () => {
    const mockUser = {user: `user`};
    const dispatch = jest.fn();
    const loginUserMock = jest.fn(() => Promise.resolve(mockUser));
    const params = {email: `email`, password: `password`};
    const loginUserThunk = loginUser(params);

    return loginUserThunk(dispatch, undefined, {loginUser: loginUserMock}).then(() => {
      expect(loginUserMock).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(authorizeUser(mockUser));
    });
  });
});
