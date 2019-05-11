import React from "react";
import PropTypes from "prop-types";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";

const App = ({films}) => (
  <div className="page-content">
    <MoviesCatalog
      films={films}/>
  </div>
);

App.propTypes = {
  /** Список отображаемых фильмов */
  films: PropTypes.arrayOf(
      PropTypes.shape({
        /** id фильма */
        id: PropTypes.string.isRequired,
        /** Название фильма */
        title: PropTypes.string.isRequired,
        /** Путь к постеру фильма */
        img: PropTypes.string,
      })
  ).isRequired,
};

export default App;
