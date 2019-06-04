
export const initialState = {
  isAuthorizationRequired: false,
  profile: null,
};

export const ActionTypes = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  UNAUTHORIZE_USER: `UNAUTHORIZE_USER`,
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
};

/**
 * Пользователю необходимо авторизоваться
 * @return {Object}
 */
export const requireAuthorization = () => {
  return {
    type: ActionTypes.AUTHORIZATION_REQUIRED,
  };
};

/**
 * Сбросить данные авторизованного пользователя
 * @return {Object}
 */
export const unauthorizeUser = () => {
  return {
    type: ActionTypes.UNAUTHORIZE_USER,
  };
};

/**
 * Авторизовать пользователя
 * @param {Object} user Параметры пользователя
 * @return {Object}
 */
export const authorizeUser = (user) => {
  return {
    type: ActionTypes.AUTHORIZE_USER,
    payload: user,
  };
};

/**
 * Запросить авторизацию пользователя
 * @param {Object} params Параметры авторизации
 * @param {string} params.email E-mail пользователя
 * @param {string} params.password Пароль пользователя
 * @return {Function}
 */
export const loginUser = (params) => {
  return (dispath, getState, api) => {
    return api.loginUser(params).then((user) => {
      return dispath(authorizeUser(user));
    });
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UNAUTHORIZE_USER:
      return {...state, profile: null};
    case ActionTypes.AUTHORIZE_USER:
      return {...state, isAuthorizationRequired: false, profile: action.payload};
    case ActionTypes.AUTHORIZATION_REQUIRED:
      return {...state, isAuthorizationRequired: true};
    default:
      return state;
  }
};
