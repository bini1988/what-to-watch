import reducer, {initialState, ActionCreator, Operation, LOGIN_ERROR_MESSAGE} from "./user";

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
    const loginUser = jest.fn(() => Promise.resolve(mockUser));
    const params = {email: `email`, password: `password`};
    const loginUserThunk = Operation.loginUser(params);

    return loginUserThunk(dispatch, undefined, {loginUser}).then(() => {
      expect(loginUser).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.login(mockUser));
    });
  });
  it(`should handle user login operation error`, () => {
    const dispatch = jest.fn();
    const error = new Error(`Handle error`);
    const loginUser = jest.fn(() => Promise.reject(error));
    const params = {email: `email`, password: `password`};
    const loginUserThunk = Operation.loginUser(params);

    return loginUserThunk(dispatch, undefined, {loginUser}).then(() => {
      expect(loginUser).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.loginError(LOGIN_ERROR_MESSAGE));
    }).catch(() => {});
  });
  it(`should make user echo operation`, () => {
    const mockUser = {user: `user`};
    const dispatch = jest.fn();
    const echoUser = jest.fn(() => Promise.resolve(mockUser));
    const echoUserThunk = Operation.echoUser();

    return echoUserThunk(dispatch, undefined, {echoUser}).then(() => {
      expect(echoUser).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.login(mockUser));
    });
  });
  it(`should handle user echo operation error`, () => {
    const dispatch = jest.fn();
    const echoUser = jest.fn(() => Promise.reject());
    const echoUserThunk = Operation.echoUser();

    return echoUserThunk(dispatch, undefined, {echoUser}).then(() => {
      expect(echoUser).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.logout());
    });
  });
});
