import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();
  }

  render() {
    const {src, poster, width, height, muted} = this.props;

    return (
      <video
        ref={this._videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted={muted}
        preload="none"/>
    );
  }

  play() {
    const video = this._videoRef.current;
    if (video) {
      return video.play();
    }
    return Promise.reject();
  }

  stop() {
    const video = this._videoRef.current;
    if (video) {
      video.load();
    }
  }

  pause() {
    const video = this._videoRef.current;
    if (video) {
      video.pause();
    }
  }
}

VideoPlayer.propTypes = {
  /** Указывает путь к воспроизводимому видеоролику */
  src: PropTypes.string,
  /** Указывает адрес картинки, которая будет отображаться, пока видео не доступно или не воспроизводится */
  poster: PropTypes.string,
  /** Задает ширину области для воспроизведения видеоролика */
  width: PropTypes.number,
  /** Задает высоту области для воспроизведения видеоролика */
  height: PropTypes.number,
  /** Не воспроизводить аудио дорожку */
  muted: PropTypes.bool,
};

export default VideoPlayer;
