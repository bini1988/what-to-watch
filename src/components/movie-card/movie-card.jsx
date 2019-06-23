import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import {MovieCardPropTypes} from "../../prop-types";

import withMovieCard, {MovieCardContext} from "./hocs/withMovieCard";

import Header from "./components/header";
import Poster from "./components/poster";
import Breadcrumbs from "./components/breadcrumbs";
import InfoWrapper from "./components/info-wrapper";
import Wrapper from "./components/wrapper";
import Description from "./components/description";
import PlayButton from "./components/play-button";
import ListButton from "./components/list-button";
import ReviewButton from "./components/review-button";
import About from "./components/about";

function MovieCard(props) {
  const {card = {}, full, children} = props;
  const {images = {}} = card;
  const style = {background: images.backgroundColor};

  return (
    <section
      style={style}
      className={cn(
          `movie-card`,
          {"movie-card--full": full}
      )}>
      <MovieCardContext.Provider value={props}>
        {children}
      </MovieCardContext.Provider>
    </section>
  );
}

/** Шапка карточки фильма */
MovieCard.Header = withMovieCard(Header);
/** Постер фильма */
MovieCard.Poster = withMovieCard(Poster);
MovieCard.Breadcrumbs = withMovieCard(Breadcrumbs);
MovieCard.InfoWrapper = InfoWrapper;
MovieCard.Wrapper = Wrapper;
MovieCard.Description = withMovieCard(Description);
/** Проиграть фильм */
MovieCard.PlayButton = withMovieCard(PlayButton);
/** Добавить фильм в список «к просмотру» */
MovieCard.ListButton = withMovieCard(ListButton);
/** Добавить отзыв к фильму */
MovieCard.ReviewButton = withMovieCard(ReviewButton);
/** Расширенная информация о фильме */
MovieCard.About = withMovieCard(About);

MovieCard.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Модификатор карточки */
  full: PropTypes.bool,
  /** Добавить/удалить фильм из списока «к просмотру» */
  onToMyListToggle: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default MovieCard;
