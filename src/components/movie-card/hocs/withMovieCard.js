import React from "react";

export const MovieCardContext = React.createContext();

const withMovieCard = (Component) => {
  function WithMovieCard(props) {
    return (
      <MovieCardContext.Consumer>
        {({card, onToMyListAdd}) => (
          <Component
            {...props}
            card={card}
            onToMyListAdd={onToMyListAdd}/>
        )}
      </MovieCardContext.Consumer>
    );
  }

  return WithMovieCard;
};

export default withMovieCard;
