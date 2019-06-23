import React from "react";
import PropTypes from "prop-types";
import {MovieReviewPropTypes, MovieCardPropTypes} from "../../../prop-types";

import MovieNav from "../../movie-nav/movie-nav";

import MovieOverview from "./movie-overview";
import MovieDetails from "./movie-details";
import MovieReviews from "./movie-reviews";

const AboutTabs = {
  OVERVIEW: {
    label: `Overview`,
    component: MovieOverview,
  },
  DETAILS: {
    label: `Details`,
    component: MovieDetails,
  },
  REVIEWS: {
    label: `Reviews`,
    component: MovieReviews,
  },
};

function About({card = {}, reviews, tab = ``}) {
  const tabUpper = tab.toUpperCase();
  const tabName = AboutTabs[tabUpper] ? tabUpper : `OVERVIEW`;
  const Tab = AboutTabs[tabName];

  return (
    <div className="movie-card__desc">
      <MovieNav className="movie-card__nav">
        {Object.entries(AboutTabs).map(([name, {label}]) => (
          <MovieNav.Item
            key={name}
            label={label}
            href={`#${label}`}
            active={name === tabName}/>
        ))}
      </MovieNav>
      <Tab.component
        reviews={reviews}
        card={card}/>
    </div>
  );
}

About.propTypes = {
  /** Имя отображемой вкладки */
  tab: PropTypes.oneOf([`Overview`, `Details`, `Reviews`]),
  /** Карточка фильма */
  card: MovieCardPropTypes,
  /** Отзывы к фильму */
  reviews: PropTypes.arrayOf(
      MovieReviewPropTypes,
  ),
};

export default About;
