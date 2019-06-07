import React from "react";
import PropTypes from "prop-types";

function AddReview({maxRating, defaultRating, onSubmit}) {
  const toIndex = (it, index) => index + 1;
  const ratings = Array.from({length: maxRating}, toIndex);

  return (
    <div className="add-review">
      <form
        className="add-review__form"
        onSubmit={(event) => {
          event.preventDefault();

          const form = event.target;
          const isRatingChecked = (it) => form.elements[`star-${it}`].checked;
          const rating = ratings.find(isRatingChecked);
          const text = form.elements[`review-text`].value;

          if (onSubmit) {
            onSubmit({rating, text});
          }
        }}>
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((rating) => (
              <React.Fragment key={rating}>
                <input
                  className="rating__input"
                  id={`star-${rating}`}
                  name="rating"
                  type="radio"
                  value={rating}
                  defaultChecked={rating === defaultRating}/>
                <label
                  className="rating__label"
                  htmlFor={`star-${rating}`}>
                  {`Rating ${rating}`}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            id="review-text"
            name="review-text"
            placeholder="Review text"/>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              {`Post`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddReview.defaultProps = {
  maxRating: 5,
  defaultRating: 3,
};
AddReview.propTypes = {
  /** Максимальный рейтинг */
  maxRating: PropTypes.number,
  /** Рейтинг по умолчанию */
  defaultRating: PropTypes.number,
  /** Отправить форму */
  onSubmit: PropTypes.func,
};

export default AddReview;
