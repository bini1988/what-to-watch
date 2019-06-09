import NameSpace from "../name-spaces";

/**
 * Вернуть пользовательские данные
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const getUser = (state = {}) => {
  return state[NameSpace.User] || {};
};

/**
 * Авторизаван ли пользователь
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const isAuthenticated = (state) => {
  return getUser(state).isAuthenticated;
};

/**
 * Вернуть данные авторизованного пользователя
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const getUserData = (state) => {
  return getUser(state).data;
};

/**
 * Вернуть ошибку авторизации
 * @param {Object} state Текущее состояние redux стора
 * @return {Any}
 */
export const getAuthError = (state) => {
  return getUser(state).error;
};
