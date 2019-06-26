import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieCardPropTypes} from "../../prop-types";
import {getMovieById} from "../../reducer/movies/selectors";
import VideoPlayer from "../video-player/video-player";

function VideoPlayerPageView({movie = {}, history}) {
  const {title, trailer, images = {}} = movie;
  const handleExit = () => {
    if (history) {
      history.goBack();
    }
  };

  return (
    <VideoPlayer
      autoplay
      src={trailer}
      title={title}
      poster={images.preview}
      onExit={handleExit}/>
  );
}

VideoPlayerPageView.propTypes = {
  /** Карточка фильма */
  movie: MovieCardPropTypes,
  /** Объект history React-Router */
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  return {
    movie: getMovieById(state, id),
  };
};
const mapDispatchToProps = {};
const VideoPlayerPage = connect(mapStateToProps, mapDispatchToProps)(VideoPlayerPageView);

export {VideoPlayerPageView};
export default VideoPlayerPage;

