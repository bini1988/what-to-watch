import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation} from "../../reducer/movies/movies";
import {getPromoMovie} from "../../reducer/movies/selectors";

import {Operation as GenresOperation, ActionCreator as GenresActionCreator} from "../../reducer/genres/genres";
import {getActiveGenre, getMoviesGenresList, getMoviesByGenre, getLimitByGenre} from "../../reducer/genres/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

class MainPage extends PureComponent {
  render() {
    const {
      promoMovieCard = {},
      movies,
      moviesGenres,
      activeGenre,
      moviesLimit,
      onGenreChange,
      onMoviesMore,
      onToMyListToggle
    } = this.props;

    return (
      <React.Fragment>
        <MovieCard
          card={promoMovieCard}
          onToMyListToggle={onToMyListToggle}>
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
            onGenreChange={onGenreChange}
            onMoviesMore={onMoviesMore}
            limit={moviesLimit}/>
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
  /** Количество отображаемых фильмов */
  moviesLimit: PropTypes.number,
  /** Получить список фильмов */
  onMoviesFetch: PropTypes.func,
  /** Получить следующий набор фильмов соответвующего жанра */
  onMoviesMore: PropTypes.func,
  /** Получить текущий промо фильм */
  onPromoMovieFetch: PropTypes.func,
  /** Добавить/удалить фильм из списока «к просмотру» */
  onToMyListToggle: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  const activeGenre = getActiveGenre(state);

  return {
    promoMovieCard: getPromoMovie(state),
    movies: getMoviesByGenre(state, activeGenre),
    moviesGenres: getMoviesGenresList(state),
    moviesLimit: getLimitByGenre(state, activeGenre),
    activeGenre,
  };
};
const mapDispatchToProps = {
  onGenreChange: GenresActionCreator.changeActiveGenre,
  onMoviesMore: GenresOperation.increaseGenreLimit,
  onMoviesFetch: Operation.fetchMovies,
  onPromoMovieFetch: Operation.fetchPromoMovie,
  onToMyListToggle: Operation.toggleMovieToMyList,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

