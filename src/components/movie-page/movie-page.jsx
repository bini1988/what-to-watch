import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieCardPropTypes} from "../../prop-types";
import {getMovieById} from "../../reducer/movies/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

import MovieCardMock from "../../mocks/movie-card";

function MoviePage({movie = MovieCardMock, location = {}}) {
  const {hash = ``} = location;
  const page = hash.slice(1) || undefined;

  return (
    <React.Fragment>
      <MovieCard full card={movie}>
        <MovieCard.Wrapper main>
          <MovieCard.Header component={PageHeader}>
            <PageTitle hidden>{`WTW`}</PageTitle>
            <UserBlock/>
          </MovieCard.Header>
          <MovieCard.Wrapper>
            <MovieCard.Description>
              <MovieCard.PlayButton/>
              <MovieCard.ListButton/>
              <MovieCard.ReviewButton/>
            </MovieCard.Description>
          </MovieCard.Wrapper>
        </MovieCard.Wrapper>
        <MovieCard.InfoWrapper translate>
          <MovieCard.Poster mode="big"/>
          <MovieCard.About page={page}/>
        </MovieCard.InfoWrapper>
      </MovieCard>
      <div className="page-content">
        <MoviesCatalog/>
        <PageFooter/>
      </div>
    </React.Fragment>
  );
}

MoviePage.propTypes = {
  /** Карточка фильма */
  movie: MovieCardPropTypes,
  /** React Router location */
  location: PropTypes.object,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  return {
    movie: getMovieById(state, id),
  };
};
const mapDispatchToProps = {};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

