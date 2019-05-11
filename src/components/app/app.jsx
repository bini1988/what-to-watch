import React from "react";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";

const App = ({films}) => (
  <div className="page-content">
    <MoviesCatalog
      films={films}/>
  </div>
);

App.propTypes = {
  /** Список отображаемых фильмов */
  films: MoviesCatalog.propTypes.films,
};

export default App;
