import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieCardPropTypes} from "../../prop-types";
import {Operation as MoviesOperation} from "../../reducer/movies/movies";
import {getMovieById} from "../../reducer/movies/selectors";
import VideoPlayer from "../video-player/video-player";

class VideoPlayerPageView extends PureComponent {
  render() {
    const {movie = {}, history} = this.props;
    const {title, trailer, images = {}} = movie;
    const handleExit = () => {
      if (history) {
        history.push(`/film/${movie.id}`);
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

  componentDidMount() {
    const {match} = this.props;
    const id = match && match.params.id;

    this.props.onMovieFetch(id);
  }
}

VideoPlayerPageView.propTypes = {
  /** React Router match */
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  /** Карточка фильма */
  movie: MovieCardPropTypes,
  /** Объект history React-Router */
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  /** Получить фильм */
  onMovieFetch: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state, {match}) => {
  const id = match && match.params.id;
  return {
    movie: getMovieById(state, id),
  };
};
const mapDispatchToProps = {
  onMovieFetch: MoviesOperation.fetchMovie,
};
const VideoPlayerPage = connect(mapStateToProps, mapDispatchToProps)(VideoPlayerPageView);

export {VideoPlayerPageView};
export default VideoPlayerPage;

