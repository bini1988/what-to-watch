import React from "react";
import {connect} from "react-redux";
import {getMoviesByGenres, changeMoviesActiveGenre} from "../../reducer";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";

export const App = ({moviesGenreGroups, activeGenre, onGenreChange}) => (
  <div className="page-content">
    <MoviesCatalog
      moviesGenreGroups={moviesGenreGroups}
      activeGenre={activeGenre}
      onGenreChange={onGenreChange}/>
  </div>
);

App.propTypes = {
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Активный жанр */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
};

const mapStateToProps = (state) => {
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    activeGenre: state.activeGenre,
  };
};
const mapDispatchToProps = {onGenreChange: changeMoviesActiveGenre};

export default connect(mapStateToProps, mapDispatchToProps)(App);
