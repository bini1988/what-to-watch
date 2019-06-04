
/**
 * Пользовательские данные
 * @class
 * @param {Object} data
 */
function User(data = {}) {
  this.id = data.id;
  this.name = data.name;
  this.email = data.email;
  this.avatar = `https://es31-server.appspot.com/${data.avatar_url}`;
}

export default User;
