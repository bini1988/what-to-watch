
export const ActionTypes = {
  LOGIN_USER: `LOGIN_USER`,
  LOGOUT_USER: `LOGOUT_USER`,
  LOGIN_ERROR: `LOGIN_ERROR`,
};

export const ActionCreator = {
  /**
   * Авторизовать пользователя
   * @param {Object} user Параметры пользователя
   * @return {Object}
   */
  login: (user) => {
    return {type: ActionTypes.LOGIN_USER, payload: user};
  },
  /**
   * Сбросить авторизацию текущего пользователя
   * @return {Object}
   */
  logout: () => {
    return {type: ActionTypes.LOGOUT_USER};
  },
  /**
   * Ошибка авторизации пользователя
   * @param {Any} error Описание ошибки
   * @return {Object}
   */
  loginError: (error) => {
    return {type: ActionTypes.LOGIN_ERROR, error};
  },
};

export const Operation = {
  /**
   * Авторизовать пользователя с заданными параметрами
   * @param {Object} params Параметры авторизации
   * @param {string} params.email E-mail пользователя
   * @param {string} params.password Пароль пользователя
   * @return {Promise}
   */
  loginUser: (params) => {
    return (dispath, getState, api) => {
      return api.loginUser(params).then((user) => {
        return dispath(ActionCreator.login(user));
      }).catch((error) => {
        dispath(ActionCreator.loginError(`We can’t recognize this email
        and password combination. Please try again`));
        throw error;
      });
    };
  },
  /**
   * Проверить аторизован ли текущий пользователь
   * @return {Promise}
   */
  echoUser: () => {
    return (dispath, getState, api) => {
      return api.echoUser().then((user) => {
        return dispath(ActionCreator.login(user));
      }).catch(() => {
        dispath(ActionCreator.logout());
      });
    };
  }
};

export const initialState = {
  /** Авторизован ли текущий пользователь */
  isAuthenticated: false,
  /** Ошибка авторизации */
  error: null,
  /** Пользовательские данные */
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {...state, isAuthenticated: true, data: action.payload, error: null};
    case ActionTypes.LOGOUT_USER:
      return {...initialState};
    case ActionTypes.LOGIN_ERROR:
      return {...initialState, error: action.error};
    default:
      return state;
  }
};
