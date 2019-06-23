import reducer, {initialState, ActionCreator, Operation} from "./user";

describe(`User Reducer`, () => {
  it(`should return state`, () => {
    const action = {type: `UNKNOWN`};
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it(`should login given user`, () => {
    const user = {name: `user-1`};
    const action = ActionCreator.login(user);
    const state = {...initialState};

    expect(reducer(state, action))
      .toEqual({...initialState, isAuthenticated: true, data: user});
  });
  it(`should logout current user`, () => {
    const action = ActionCreator.logout();
    const state = {
      ...initialState,
      isAuthenticated: true,
      data: {name: `user-1`},
    };

    expect(reducer(state, action))
      .toEqual({...initialState});
  });
  it(`should set login error`, () => {
    const error = `Error message`;
    const action = ActionCreator.loginError(error);
    const state = {...initialState};

    expect(reducer(state, action))
      .toEqual({...initialState, error});
  });
  it(`should make user login operation`, () => {
    const mockUser = {user: `user`};
    const dispatch = jest.fn();
    const loginUserMock = jest.fn(() => Promise.resolve(mockUser));
    const params = {email: `email`, password: `password`};
    const loginUserThunk = Operation.loginUser(params);

    return loginUserThunk(dispatch, undefined, {loginUser: loginUserMock}).then(() => {
      expect(loginUserMock).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.login(mockUser));
    });
  });
  it(`should make user echo operation`, () => {
    const mockUser = {user: `user`};
    const dispatch = jest.fn();
    const echoUserMock = jest.fn(() => Promise.resolve(mockUser));
    const echoUserThunk = Operation.echoUser();

    return echoUserThunk(dispatch, undefined, {echoUser: echoUserMock}).then(() => {
      expect(echoUserMock).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.login(mockUser));
    });
  });
});
