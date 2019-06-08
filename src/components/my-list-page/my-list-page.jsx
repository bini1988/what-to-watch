import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation} from "../../reducer/movies/movies";
import {getMyListMovies, getMoviesByGenres} from "../../reducer/movies/selectors";

import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

import user from "../../mocks/user";

class MyListPage extends PureComponent {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const {moviesGenreGroups} = this.props;

    return (
      <div className="user-page">
        <PageHeader className="user-page__head">
          <PageTitle className="user-page__title">
            {`My list`}
          </PageTitle>
          <UserBlock user={user}/>
        </PageHeader>
        <MoviesCatalog
          moviesGenreGroups={moviesGenreGroups}/>
        <PageFooter/>
      </div>
    );
  }
}

MyListPage.propTypes = {
  /** Список отображаемых фильмов группированных по жанрам */
  myListMovies: PropTypes.arrayOf(
      PropTypes.object,
  ),
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Получить список фильмов */
  fetchMovies: PropTypes.func,
  /** Получить список фильмов добавленных в список «к просмотру» */
  fetchMyListMovies: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    myListMovies: getMyListMovies(state),
  };
};
const mapDispatchToProps = {
  fetchMovies: Operation.fetchMovies,
  fetchMyListMovies: Operation.fetchMyListMovies,
};

export {MyListPage};
export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);

