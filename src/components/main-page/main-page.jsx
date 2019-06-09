import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation, ActionCreator} from "../../reducer/movies/movies";
import {getPromoMovie, getMoviesByGenre, getMoviesGenres, getActiveGenre} from "../../reducer/movies/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.fetchMovies();
    this.props.fetchPromoMovie();
  }

  render() {
    const {promoMovie = {}, movies, moviesGenres, activeGenre, onGenreChange} = this.props;
    const {title, genre, year, images = {}} = promoMovie;

    return (
      <React.Fragment>
        <MovieCard
          card={promoMovie}
          renderHeader={({className}) => (
            <PageHeader className={className}>
              <PageTitle hidden={true}>{`WTW`}</PageTitle>
              <UserBlock/>
            </PageHeader>
          )}>
          <MovieCard.Info>
            <MovieCard.Poster
              title={title}
              poster={images.poster}/>
            <MovieCard.Description
              title={title}
              genre={genre}
              year={year}>
              <MovieCard.PlayButton/>
              <MovieCard.ListButton/>
            </MovieCard.Description>
          </MovieCard.Info>
        </MovieCard>
        <div className="page-content">
          <MoviesCatalog
            movies={movies}
            moviesGenres={moviesGenres}
            activeGenre={activeGenre}
            onGenreChange={onGenreChange}/>
          <PageFooter/>
        </div>
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  /** Текущий промо фильм */
  promoMovie: PropTypes.object,
  /** Список отображаемых фильмов */
  movies: MoviesCatalog.propTypes.movies,
  /** Список отображаемых жанров фильмов */
  moviesGenres: MoviesCatalog.propTypes.moviesGenres,
  /** Активный жанр фильмов */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
  /** Получить список фильмов */
  fetchMovies: PropTypes.func,
  /** Получить текущий промо фильм */
  fetchPromoMovie: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  const activeGenre = getActiveGenre(state);

  return {
    promoMovie: getPromoMovie(state),
    movies: getMoviesByGenre(state, activeGenre),
    moviesGenres: getMoviesGenres(state),
    activeGenre,
  };
};
const mapDispatchToProps = {
  fetchMovies: Operation.fetchMovies,
  fetchPromoMovie: Operation.fetchPromoMovie,
  onGenreChange: ActionCreator.changeActiveGenre,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

