import NameSpace from "../name-spaces";

/**
 * Необходима авторизация пользователя
 * @param {Object} state Текущее состояние redux стора
 * @return {boolean}
 */
export const isAuthorizationRequired = (state) => {
  return state[NameSpace.User].isAuthorizationRequired;
};
