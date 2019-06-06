import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

function SignIn({className, message, valid = {}, onSubmit}) {
  return (
    <div className={cn(`sign-in`, className)}>
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
        {message && (
          <div className="sign-in__message">
            <p>{message}</p>
          </div>
        )}
        <div className="sign-in__fields">
          <div
            className={cn(
                `sign-in__field`,
                {[`sign-in__field--error`]: valid.email},
            )}>
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
          <div
            className={cn(
                `sign-in__field`,
                {[`sign-in__field--error`]: valid.password},
            )}>
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
  /** Дополнительный класс к контейнеру */
  className: PropTypes.string,
  /** Сообщение об ошибке */
  message: PropTypes.string,
  /** Объект валидации формы */
  valid: PropTypes.shape({
    /** Является ли поле email валидным */
    email: PropTypes.bool,
    /** Является ли поле password валидным */
    password: PropTypes.bool,
  }),
  /** Отправить форму логина */
  onSubmit: PropTypes.func,
};

export default SignIn;
