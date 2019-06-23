import React from "react";

const MovieCardContext = React.createContext();

const withMovieCard = (Component) => {
  function WithMovieCard(props) {
    return (
      <MovieCardContext.Consumer>
        {({card, onToMyListToggle}) => (
          <Component
            {...props}
            card={card}
            onToMyListToggle={onToMyListToggle}/>
        )}
      </MovieCardContext.Consumer>
    );
  }

  return WithMovieCard;
};

export {MovieCardContext};
export default withMovieCard;
