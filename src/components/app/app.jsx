import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadMovies, getMoviesByGenres, changeMoviesActiveGenre} from "../../reducer";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";

export class App extends PureComponent {
  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    const {moviesGenreGroups, activeGenre, onGenreChange} = this.props;
    return (
      <div className="page-content">
        <MoviesCatalog
          moviesGenreGroups={moviesGenreGroups}
          activeGenre={activeGenre}
          onGenreChange={onGenreChange}/>
      </div>
    );
  }
}

App.defaultProps = {
  loadMovies: () => {},
};
App.propTypes = {
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Активный жанр */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
  /** Получить полный список фильмов */
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    activeGenre: state.activeGenre,
  };
};
const mapDispatchToProps = {
  onGenreChange: changeMoviesActiveGenre,
  loadMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
