import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import MovieNav from "../movie-nav/movie-nav";
import MovieRating from "../movie-rating/movie-rating";

import Header from "./components/header";
import HeroHeader from "./components/hero-header";
import Poster from "./components/poster";
import Description from "./components/description";
import Info from "./components/info";

import MovieOverview from "./components/movie-overview";
// import MovieDetails from "./components/movie-details";
// import MovieReviews from "./components/movie-reviews";

import PlayButton from "./components/play-button";
import ListButton from "./components/list-button";
import ReviewButton from "./components/review-button";

function MovieCard({card = {}, mode, renderHeader, renderHeroHeader, children}) {
  const {id, title, images = {}} = card;
  const isFullCard = (mode === `full`);

  return (
    <section className={cn(
        `movie-card`,
        {"movie-card--full": (mode === `full`)}
    )}>
      {renderHeader && (isFullCard ? (
        <Header
          title={title}
          poster={images.poster}
          background={images.background}>
          {renderHeader({className: `movie-card__head`})}
        </Header>
      ) : (
        <React.Fragment>
          <div className="movie-card__bg">
            <img src={images.background} alt={title}/>
          </div>
          {renderHeader({className: `movie-card__head`})}
        </React.Fragment>
      ))}
      {renderHeroHeader && (
        <HeroHeader
          title={title}
          background={images.background}
          renderHeader={renderHeroHeader}>
          <Description {...card}>
            <PlayButton/>
            <ListButton/>
            <ReviewButton
              to={`/film/${id}/review`}/>
          </Description>
        </HeroHeader>
      )}
      {renderHeroHeader && (
        <Info
          topTranslate={true}>
          <Poster
            mode="big"
            title={title}
            poster={images.poster}/>
          <div className="movie-card__desc">
            <MovieNav className="movie-card__nav">
              <MovieNav.Item label="Overview" href="#overview"/>
              <MovieNav.Item label="Details" href="#details"/>
              <MovieNav.Item label="Reviews" href="#reviews"/>
            </MovieNav>
            <MovieOverview {...card}/>
            {/* <MovieDetails {...card}/> */}
            {/* <MovieReviews {...card}/> */}
          </div>
        </Info>
      )}
      {children}
    </section>
  );
}

MovieCard.Header = Header;
MovieCard.Info = Info;
MovieCard.Poster = Poster;
MovieCard.Description = Description;
MovieCard.PlayButton = PlayButton;
MovieCard.ListButton = ListButton;
MovieCard.propTypes = {
  /** Карточка фильма */
  card: PropTypes.shape({
    /** id фильма */
    id: PropTypes.number,
    /** Название фильма */
    title: PropTypes.string,
    /** Жанр фильма */
    genre: PropTypes.string,
    /** Год выхода */
    year: PropTypes.number,
    /** Описание фильма */
    description: PropTypes.string,
    /** Режисер фильма */
    director: PropTypes.string,
    /** Актерский состав */
    starring: PropTypes.arrayOf(
        PropTypes.string,
    ),
    /** Продолжительность фильма */
    duration: PropTypes.string,
    /** Набор изображений фильма */
    images: PropTypes.shape({
      /** Превью к трейлеру фильма */
      preview: PropTypes.string,
      /** Постер к фильму */
      poster: PropTypes.string,
      /** Оформление к фильму */
      background: PropTypes.string,
    }),
    /** Путь к трейлеру фильма */
    trailer: PropTypes.string,
    /** Рейтинг фильма */
    rating: MovieRating.propTypes.rating,
  }),
  /** Модификатор карточки */
  mode: PropTypes.oneOf([
    `full`,
  ]),
  /** Рендер функция шапки карточки */
  renderHeader: PropTypes.func,
  /** Рендер функция шапки карточки */
  renderHeroHeader: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

export default MovieCard;
