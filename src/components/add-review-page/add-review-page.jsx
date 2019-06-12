import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer/reviews/reviews";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import UserBlock from "../user-block/user-block";
import AddReview from "../add-review/add-review";

import MovieCardMock from "../../mocks/movie-card";

function AddReviewPage({onReviewSubmit}) {
  return (
    <MovieCard full card={MovieCardMock}>
      <MovieCard.Header>
        <PageHeader>
          <PageTitle hidden>{`WTW`}</PageTitle>
          <MovieCard.Breadcrumbs/>
          <UserBlock/>
        </PageHeader>
        <MovieCard.Poster
          mode="small"/>
      </MovieCard.Header>
      <AddReview
        onSubmit={onReviewSubmit}/>
    </MovieCard>
  );
}

AddReviewPage.propTypes = {
  /** Обработчик события отправки формы */
  onReviewSubmit: PropTypes.func,
};

const mapDispatchToProps = {
  onReviewSubmit: Operation.submitMovieReview,
};

export {AddReviewPage};
export default connect(null, mapDispatchToProps)(AddReviewPage);

