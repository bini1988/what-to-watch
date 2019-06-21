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
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    render() {
      const {rating, comment} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}/>;
    }

    _handleRatingChange(rating) {
      this.setState({rating});
    }
    _handleCommentChange(comment) {
      this.setState({comment});
    }
  }

  WithReviewForm.propTypes = Component.propTypes;

  return WithReviewForm;
};

export const withReviewFormPropTypes = {
  /** Рейтинг фильма */
  rating: PropTypes.number,
  /** Комментарий к фильму */
  comment: PropTypes.number,
  /** Обработчик события изменения рейтенга */
  onRatingChange: PropTypes.number,
  /** Обработчик события изменения комментария */
  onCommentChange: PropTypes.number,
};

export default withReviewForm;
