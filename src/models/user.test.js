import User from "./user";

describe(`User model`, () => {
  it(`should return User model`, () => {
    const data = {
      "id": 1,
      "email": `rus.nick@mail.ru`,
      "name": `rus.nick`,
      "avatar_url": `/wtw/static/avatar/9.jpg`,
    };

    expect(new User(data))
      .toEqual({
        id: 1,
        name: `rus.nick`,
        email: `rus.nick@mail.ru`,
        avatar: `https://es31-server.appspot.com//wtw/static/avatar/9.jpg`
      });
  });
});
