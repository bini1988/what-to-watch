import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieCardPropTypes} from "../../prop-types";
import {Operation} from "../../reducer/reviews/reviews";
import {getMovieById} from "../../reducer/movies/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import UserBlock from "../user-block/user-block";
import AddReview from "../add-review/add-review";

function AddReviewPage({movie = {}, onReviewSubmit}) {
  const handleRevieSubmit = (review) => {
    onReviewSubmit(movie.id, review);
  };

  return (
    <MovieCard full card={movie}>
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
        onSubmit={handleRevieSubmit}/>
    </MovieCard>
  );
}

AddReviewPage.propTypes = {
  /** Карточка фильма */
  movie: MovieCardPropTypes,
  /** Обработчик события отправки формы */
  onReviewSubmit: PropTypes.func,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  const movie = getMovieById(state, id);

  return {movie};
};
const mapDispatchToProps = {
  onReviewSubmit: Operation.submitMovieReview,
};

export {AddReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);

