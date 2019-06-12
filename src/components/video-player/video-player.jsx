import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import PlayButton from "./components/play-button";
import PauseButton from "./components/pause-button";
import FullScreenButton from "./components/full-screen-button";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
    this._togglePlayer = this._togglePlayer.bind(this);
    this._handlePlay = this._handlePlay.bind(this);
    this._handlePause = this._handlePause.bind(this);
    this._handleFullScreenToggle = this._handleFullScreenToggle.bind(this);
    this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
    this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
    this._handleEnded = this._handleEnded.bind(this);
    this._handleExit = this._handleExit.bind(this);

    this.state = {
      /** Воспроизведение/пауза */
      isPlaying: false,
      /** Общее время воспроизведения, сек */
      totalTime: 0,
      /** Текущее время воспроизведения, сек */
      currentTime: 0,
    };
  }

  render() {
    const {isPlaying, currentTime, totalTime} = this.state;
    const {title, src, poster} = this.props;

    const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;
    const progressValue = progress.toFixed(2);
    const elapsedTime = this._formatTime(totalTime - currentTime, totalTime);

    return (
      <div className="player">
        <video
          ref={this._videoRef}
          className="player__video"
          src={src}
          poster={poster}
          onCanPlayThrough={this._handleCanPlayThrough}
          onTimeUpdate={this._handleTimeUpdate}
          onEnded={this._handleEnded}/>
        <button
          type="button"
          className="player__exit"
          onClick={this._handleExit}>
          {`Exit`}
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={progressValue}
                max="100"/>
              <div
                className="player__toggler"
                style={{left: `${progressValue}%`}}>
                {`Toggler`}
              </div>
            </div>
            <div className="player__time-value">
              {elapsedTime}
            </div>
          </div>
          <div className="player__controls-row">
            {isPlaying ? (
              <PauseButton
                onClick={this._handlePause}/>
            ) : (
              <PlayButton
                onClick={this._handlePlay}/>
            )}
            <div className="player__name">
              {title}
            </div>
            <FullScreenButton
              onClick={this._handleFullScreenToggle}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlaying !== prevState.isPlaying) {
      this._togglePlayer();
    }
  }

  _togglePlayer() {
    const video = this._videoRef.current;

    if (!video) {
      return;
    }

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  _breakTime(time) {
    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_MINUTE = 60;

    return [
      Math.floor(time / SECONDS_PER_HOUR),
      Math.floor((time % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
      Math.floor(time % SECONDS_PER_HOUR % SECONDS_PER_MINUTE),
    ];
  }

  _padTime(value) {
    return `${value}`.padStart(2, `0`);
  }

  _formatTime(time = 0, totalTime = 0) {
    const timeParts = this._breakTime(time);
    const totalTimeParts = this._breakTime(totalTime);
    const formatedTimeParts = [];

    for (let index = 0; index < timeParts.length; index++) {
      if (totalTimeParts[index]) {
        const hasPrevTimePart = totalTimeParts[index - 1];
        const formatedPart = hasPrevTimePart
          ? this._padTime(timeParts[index]) : timeParts[index];

        formatedTimeParts.push(formatedPart);
      }
    }

    return formatedTimeParts.join(`:`);
  }

  _handlePlay() {
    this.setState({isPlaying: true});
  }

  _handlePause() {
    this.setState({isPlaying: false});
  }

  _handleCanPlayThrough() {
    const video = this._videoRef.current;

    if (!video) {
      return;
    }

    this.setState({totalTime: video.duration});
  }

  _handleTimeUpdate() {
    const video = this._videoRef.current;
    const {currentTime} = this.state;

    if (!video) {
      return;
    }

    const SAMPLING_TIME = 0.3; // sec

    if (Math.abs(video.currentTime - currentTime) >= SAMPLING_TIME) {
      this.setState({currentTime: video.currentTime});
    }
  }

  _handleFullScreenToggle() {
    const video = this._videoRef.current;

    if (!video) {
      return;
    }

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  _handleEnded() {
    this.setState({isPlaying: false, currentTime: 0});
  }

  _handleExit() {
    if (!document.fullscreenElement) {
      document.exitFullscreen();
    }

    this._handlePause();

    if (this.props.onExit) {
      this.props.onExit();
    }
  }
}

VideoPlayer.propTypes = {
  /** Указывает путь к воспроизводимому видеоролику */
  src: PropTypes.string,
  /** Описание воспроизводимого видеоролика */
  title: PropTypes.string,
  /** Указывает адрес картинки, которая будет отображаться, пока видео не доступно или не воспроизводится */
  poster: PropTypes.string,
  /** Обработчик события выхода */
  onExit: PropTypes.func,
};

export default VideoPlayer;
