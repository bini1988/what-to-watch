import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation, ActionCreator} from "../../reducer/movies/movies";
import {getPromoMovie, getMoviesByGenres, getActiveGenre} from "../../reducer/movies/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

import user from "../../mocks/user";

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.fetchMovies();
    this.props.fetchPromoMovie();
  }

  render() {
    const {promoMovieCard = {}, moviesGenreGroups, activeGenre, onGenreChange} = this.props;
    const {title, genre, year, images = {}} = promoMovieCard;

    return (
      <React.Fragment>
        <MovieCard
          card={promoMovieCard}
          renderHeader={({className}) => (
            <PageHeader className={className}>
              <PageTitle hidden={true}>{`WTW`}</PageTitle>
              <UserBlock user={user}/>
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
            moviesGenreGroups={moviesGenreGroups}
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
  promoMovieCard: PropTypes.object,
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Активный жанр */
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
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    activeGenre: getActiveGenre(state),
    promoMovieCard: getPromoMovie(state),
  };
};
const mapDispatchToProps = {
  onGenreChange: ActionCreator.changeActiveGenre,
  fetchMovies: Operation.fetchMovies,
  fetchPromoMovie: Operation.fetchPromoMovie,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

