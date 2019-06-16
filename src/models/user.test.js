import User from "./user";
import user, {UserData} from "../mocks/user";

describe(`User model`, () => {
  it(`should return User model`, () => {
    expect(new User(UserData))
      .toEqual(user);
  });
});
