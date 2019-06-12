import React from "react";

export const MovieCardContext = React.createContext();

const withMovieCard = (Component) => {
  function WithMovieCard(props) {
    return (
      <MovieCardContext.Consumer>
        {(card) => (
          <Component {...props} card={card}/>
        )}
      </MovieCardContext.Consumer>
    );
  }

  return WithMovieCard;
};

export default withMovieCard;
