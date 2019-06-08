import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getMovieById} from "../../reducer/movies/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

import user from "../../mocks/user";

function MoviePage({movieCard}) {
  return (
    <React.Fragment>
      <MovieCard
        mode="full"
        card={movieCard}
        renderHeroHeader={({className}) => (
          <PageHeader className={className}>
            <PageTitle hidden={true}>{`WTW`}</PageTitle>
            <UserBlock user={user}/>
          </PageHeader>
        )}>
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
  movieCard: PropTypes.object,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  return {
    movieCard: getMovieById(state, id),
  };
};
const mapDispatchToProps = {};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

