import React from "react";
import PropTypes from "prop-types";

function SignIn({onSubmit}) {
  return (
    <div className="sign-in user-page__content">
      <form
        className="sign-in__form"
        onSubmit={(event) => {
          event.preventDefault();

          const form = event.target;
          const email = form.elements[`user-email`].value;
          const password = form.elements[`user-password`].value;

          if (onSubmit) {
            onSubmit({email, password});
          }
        }}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              id="user-email"
              name="user-email"
              type="email"
              placeholder="Email address"
              required/>
            <label
              className="sign-in__label visually-hidden"
              htmlFor="user-email">
              {`Email address`}
            </label>
          </div>
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              id="user-password"
              name="user-password"
              type="password"
              placeholder="Password"
              required/>
            <label
              className="sign-in__label visually-hidden"
              htmlFor="user-password">
              {`Password`}
            </label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">
            {`Sign in`}
          </button>
        </div>
      </form>
    </div>
  );
}

SignIn.propTypes = {
  /** Отправить форму логина */
  onSubmit: PropTypes.func,
};

export default SignIn;
