import NameSpace from "../name-spaces";

/**
 * Авторизаван ли пользователь
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const isAuthenticated = (state) => {
  return state[NameSpace.User].isAuthenticated;
};

/**
 * Вернуть данные авторизованного пользователя
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const getUser = (state) => {
  return state[NameSpace.User].data;
};

/**
 * Вернуть ошибку авторизации
 * @param {Object} state Текущее состояние redux стора
 * @return {Any}
 */
export const getAuthError = (state) => {
  return state[NameSpace.User].error;
};
