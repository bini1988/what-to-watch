import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieReviewPropTypes, MovieCardPropTypes} from "../../prop-types";
import {Operation as MoviesOperation} from "../../reducer/movies/movies";
import {getMovieById} from "../../reducer/movies/selectors";
import {getMoviesGenreLike} from "../../reducer/genres/selectors";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews";
import {getMovieReviewsById} from "../../reducer/reviews/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

class MoviePage extends PureComponent {
  render() {
    const {movie, movies, reviews, location = {}, onToMyListToggle} = this.props;
    const {hash = ``} = location;
    const tab = hash.slice(1) || undefined;

    return (
      <React.Fragment>
        <MovieCard
          full
          card={movie}
          onToMyListToggle={onToMyListToggle}>
          <MovieCard.Wrapper main>
            <MovieCard.Header component={PageHeader}>
              <PageTitle hidden>{`WTW`}</PageTitle>
              <UserBlock/>
            </MovieCard.Header>
            <MovieCard.Wrapper>
              <MovieCard.Description>
                <MovieCard.PlayButton/>
                <MovieCard.ListButton/>
                <MovieCard.ReviewButton/>
              </MovieCard.Description>
            </MovieCard.Wrapper>
          </MovieCard.Wrapper>
          <MovieCard.InfoWrapper translate>
            <MovieCard.Poster mode="big"/>
            <MovieCard.About
              reviews={reviews}
              tab={tab}/>
          </MovieCard.InfoWrapper>
        </MovieCard>
        <div className="page-content">
          <MoviesCatalog
            likeThis
            title="More like this"
            movies={movies}/>
          <PageFooter/>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const {match} = this.props;
    const id = match && match.params.id;

    this.props.onMovieFetch(id);
    this.props.onMovieReviewsFetch(id);
  }
}

MoviePage.propTypes = {
  /** Карточка фильма */
  movie: MovieCardPropTypes,
  /** Список похожих фильмов */
  movies: MoviesCatalog.propTypes.movies,
  /** Отзывы к фильму */
  reviews: PropTypes.arrayOf(
      MovieReviewPropTypes,
  ),
  /** React Router location */
  location: PropTypes.object,
  /** React Router match */
  match: PropTypes.object,
  /** Получить фильм */
  onMovieFetch: PropTypes.func,
  /** Получить список отзывов к фильму */
  onMovieReviewsFetch: PropTypes.func,
  /** Добавить/удалить фильм из списока «к просмотру» */
  onToMyListToggle: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  const movie = getMovieById(state, id);
  const reviews = getMovieReviewsById(state, id);
  const movies = getMoviesGenreLike(state, id);

  return {movie, reviews, movies};
};
const mapDispatchToProps = {
  onMovieFetch: MoviesOperation.fetchMovie,
  onMovieReviewsFetch: ReviewsOperation.fetchMovieReviews,
  onToMyListToggle: MoviesOperation.toggleMovieToMyList,
};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

