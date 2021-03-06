import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieCardPropTypes} from "../../prop-types";

import {Operation} from "../../reducer/movies/movies";
import {getMyListMovies} from "../../reducer/movies/selectors";

import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

class MyListPageView extends PureComponent {
  render() {
    const {movies} = this.props;

    return (
      <div className="user-page">
        <PageHeader className="user-page__head">
          <PageTitle className="user-page__title">
            {`My list`}
          </PageTitle>
          <UserBlock/>
        </PageHeader>
        <MoviesCatalog
          movies={movies}/>
        <PageFooter/>
      </div>
    );
  }

  componentDidMount() {
    this.props.onMyListMoviesFetch();
  }
}

MyListPageView.propTypes = {
  /** Список фильмов добавленных в список «к просмотру» */
  movies: PropTypes.arrayOf(
      MovieCardPropTypes,
  ),
  /** Получить список фильмов добавленных в список «к просмотру» */
  onMyListMoviesFetch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    movies: getMyListMovies(state),
  };
};
const mapDispatchToProps = {
  onMyListMoviesFetch: Operation.fetchMyListMovies,
};
const MyListPage = connect(mapStateToProps, mapDispatchToProps)(MyListPageView);

export {MyListPageView};
export default MyListPage;

