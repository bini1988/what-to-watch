import React from "react";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";

const App = () => (
  <div className="page-content">
    <MoviesCatalog
      items={[
        `Fantastic Beasts: The Crimes of Grindelwald`,
        `Bohemian Rhapsody`,
        `Macbeth`,
        `Aviator`,
        `We need to talk about Kevin`,
        `What We Do in the Shadows`,
        `Revenant`,
        `Johnny English`,
        `Shutter Island`,
      ]}/>
  </div>
);

export default App;
