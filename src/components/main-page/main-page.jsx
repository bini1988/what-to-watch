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
  render() {
    const {promoMovieCard = {}, movies, moviesGenres, activeGenre, onGenreChange, onToMyListAdd} = this.props;

    return (
      <React.Fragment>
        <MovieCard
          card={promoMovieCard}
          onToMyListAdd={onToMyListAdd}>
          <MovieCard.Header component={PageHeader}>
            <PageTitle hidden>{`WTW`}</PageTitle>
            <UserBlock/>
          </MovieCard.Header>
          <MovieCard.InfoWrapper>
            <MovieCard.Poster/>
            <MovieCard.Description>
              <MovieCard.PlayButton/>
              <MovieCard.ListButton/>
            </MovieCard.Description>
          </MovieCard.InfoWrapper>
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

  componentDidMount() {
    this.props.onMoviesFetch();
    this.props.onPromoMovieFetch();
  }
}

MainPage.propTypes = {
  /** Текущий промо фильм */
  promoMovieCard: PropTypes.object,
  /** Список отображаемых фильмов */
  movies: MoviesCatalog.propTypes.movies,
  /** Список отображаемых жанров фильмов */
  moviesGenres: MoviesCatalog.propTypes.moviesGenres,
  /** Активный жанр фильмов */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
  /** Получить список фильмов */
  onMoviesFetch: PropTypes.func,
  /** Получить текущий промо фильм */
  onPromoMovieFetch: PropTypes.func,
  /** Добавить фильм в список «к просмотру» */
  onToMyListAdd: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  const activeGenre = getActiveGenre(state);

  return {
    promoMovieCard: getPromoMovie(state),
    movies: getMoviesByGenre(state, activeGenre),
    moviesGenres: getMoviesGenres(state),
    activeGenre,
  };
};
const mapDispatchToProps = {
  onGenreChange: ActionCreator.changeActiveGenre,
  onMoviesFetch: Operation.fetchMovies,
  onPromoMovieFetch: Operation.fetchPromoMovie,
  onToMyListAdd: Operation.addMovieToMyList,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

