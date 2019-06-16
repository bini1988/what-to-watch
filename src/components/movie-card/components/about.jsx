import React from "react";
import PropTypes from "prop-types";
import {MovieCardPropTypes} from "../../../prop-types";

import MovieNav from "../../movie-nav/movie-nav";

import MovieOverview from "./movie-overview";
import MovieDetails from "./movie-details";
import MovieReviews from "./movie-reviews";

const AboutTabs = {
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

function About({card = {}, tab}) {
  const tabName = AboutTabs[tab] ? tab : `Overview`;
  const Tab = AboutTabs[tabName];

  return (
    <div className="movie-card__desc">
      <MovieNav className="movie-card__nav">
        {Object.entries(AboutTabs).map(([name, {label}]) => (
          <MovieNav.Item
            key={name}
            label={label}
            href={`#${name}`}
            active={name === tabName}/>
        ))}
      </MovieNav>
      <Tab.component card={card}/>
    </div>
  );
}

About.propTypes = {
  /** Имя отображемой вкладки */
  tab: PropTypes.oneOf(
      Object.keys(AboutTabs),
  ),
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default About;
