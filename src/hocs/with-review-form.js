import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        /** Рейтинг фильма */
        rating: null,
        /** Комментарий к фильму */
        comment: ``,
        /** Форма не валидна */
        invalid: true,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
      const {rating, comment, invalid} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        invalid={invalid}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}
        onSubmit={this._handleSubmit}/>;
    }

    _handleRatingChange(rating) {
      this.setState({rating});
    }

    _handleCommentChange(comment) {
      const {rating} = this.state;
      const isCommentValid = this._validateComment(comment);
      const isRatingValid = this._validateRating(rating);
      const invalid = !isCommentValid || !isRatingValid;

      this.setState({comment, invalid});
    }

    _handleSubmit() {
      const {onSubmit} = this.props;
      const {rating, comment} = this.state;

      if (onSubmit) {
        onSubmit({rating, comment});
      }
    }

    _validateComment(value) {
      const MIN_COMMENT_LENGTH = 50;
      const MAX_COMMENT_LENGTH = 400;

      return (
        (typeof value === `string`) &&
        (value.length >= MIN_COMMENT_LENGTH) &&
        (value.length <= MAX_COMMENT_LENGTH)
      );
    }

    _validateRating(value) {
      return (value > 0);
    }
  }

  WithReviewForm.propTypes = {
    ...Component.propTypes,
    /** Отправить форму */
    onSubmit: PropTypes.func,
  };

  return WithReviewForm;
};

export const withReviewFormPropTypes = {
  /** Рейтинг фильма */
  rating: PropTypes.number,
  /** Комментарий к фильму */
  comment: PropTypes.string,
  /** Валидна ли форма */
  invalid: PropTypes.bool,
  /** Обработчик события изменения рейтенга */
  onRatingChange: PropTypes.func,
  /** Обработчик события изменения комментария */
  onCommentChange: PropTypes.func,
  /** Обработчик события изменения комментария */
  onSubmit: PropTypes.func,
};

export default withReviewForm;
