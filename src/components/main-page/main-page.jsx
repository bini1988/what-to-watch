import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeMoviesActiveGenre} from "../../reducer/catalog/catalog";
import {getMoviesByGenres, getActiveGenre} from "../../reducer/catalog/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

import card from "../../mocks/movie-card";
import user from "../../mocks/user";

function MainPage(props) {
  const {moviesGenreGroups, activeGenre, onGenreChange} = props;

  return (
    <React.Fragment>
      <MovieCard card={card}>
        <h1 className="visually-hidden">{`WTW`}</h1>
        <PageHeader className="movie-card__head">
          <UserBlock user={user}/>
        </PageHeader>
      </MovieCard>
      <div className="page-content">
        <MoviesCatalog
          moviesGenreGroups={moviesGenreGroups}
          activeGenre={activeGenre}
          onGenreChange={onGenreChange}/>
        <PageFooter/>
      </div>
    </React.Fragment>
  );
}

MainPage.propTypes = {
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Активный жанр */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    activeGenre: getActiveGenre(state),
  };
};
const mapDispatchToProps = {
  onGenreChange: changeMoviesActiveGenre,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

