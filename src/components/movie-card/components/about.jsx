import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

import MovieNav from "../../movie-nav/movie-nav";

import MovieOverview from "./movie-overview";
import MovieDetails from "./movie-details";
import MovieReviews from "./movie-reviews";

const AboutPages = {
  Overview: {
    label: `Overview`,
    component: MovieOverview,
  },
  Details: {
    label: `Details`,
    component: MovieDetails,
  },
  Reviews: {
    label: `Reviews`,
    component: MovieReviews,
  },
};

function About({card = {}, page}) {
  const PageComponent = AboutPages[page];

  return (
    <div className="movie-card__desc">
      <MovieNav className="movie-card__nav">
        {Object.entries(AboutPages).map(([name, {label}]) => (
          <MovieNav.Item
            key={name}
            label={label}
            href={`#${name}`}
            active={name === page}/>
        ))}
      </MovieNav>
      {PageComponent ? (
        <PageComponent.component card={card}/>
      ) : (
        <MovieOverview card={card}/>
      )}
    </div>
  );
}

About.propTypes = {
  /** Имя отображемой страницы */
  page: PropTypes.oneOf(
      Object.keys(AboutPages),
  ),
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default About;
