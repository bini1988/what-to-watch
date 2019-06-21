import React from "react";
import withReviewForm, {withReviewFormPropTypes} from "../../hocs/with-review-form";

const MAX_RATING = 5;
const toIndex = (it, index) => index + 1;

function AddReview(props) {
  const {rating, comment, invalid, onRatingChange, onCommentChange, handleSubmit} = props;
  const ratings = Array.from({length: MAX_RATING}, toIndex);

  return (
    <div className="add-review">
      <form
        className="add-review__form"
        onSubmit={(event) => {
          event.preventDefault();
          if (handleSubmit) {
            handleSubmit();
          }
        }}>
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((it) => (
              <React.Fragment key={it}>
                <input
                  className="rating__input"
                  id={`star-${it}`}
                  name="rating"
                  type="radio"
                  value={it}
                  checked={it === rating}
                  onChange={() => onRatingChange(it)}/>
                <label
                  className="rating__label"
                  htmlFor={`star-${it}`}>
                  {`Rating ${it}`}
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
            placeholder="Review text"
            value={comment}
            onChange={({target}) => {
              onCommentChange(target.value);
            }}/>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={invalid}>
              {`Post`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddReview.propTypes = {
  /** withReviewForm HOC */
  ...withReviewFormPropTypes,
};

export {AddReview};
export default withReviewForm(AddReview);
