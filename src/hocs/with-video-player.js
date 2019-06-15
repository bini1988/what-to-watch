import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._renderPlayer = this._renderPlayer.bind(this);
      this._handlePlay = this._handlePlay.bind(this);
      this._handlePause = this._handlePause.bind(this);
      this._handleEnded = this._handleEnded.bind(this);
      this._handleFullScreen = this._handleFullScreen.bind(this);
      this._handleFullScreenExit = this._handleFullScreenExit.bind(this);

      this._videoRef = React.createRef();

      this.state = {
        /** Воспроизведение/пауза */
        isPlaying: false,
        /** Общее время воспроизведения, сек */
        totalTime: 0,
        /** Текущее время воспроизведения, сек */
        currentTime: 0,
        /** Прогресс воспроизведения, % */
        progress: 0,
      };
    }

    render() {
      const {isPlaying, progress, totalTime, currentTime} = this.state;

      return <Component
        {...this.props}
        renderPlayer={this._renderPlayer}
        isPlayerPlaying={isPlaying}
        playerProgress={progress}
        playerTotalTime={totalTime}
        playerTime={currentTime}
        onPlayerPlay={this._handlePlay}
        onPlayerPause={this._handlePause}
        onPlayerFullScreen={this._handleFullScreen}
        onPlayerFullScreenExit={this._handleFullScreenExit}/>;
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.isPlaying !== prevState.isPlaying) {
        this._toggleVideoPlayer();
      }
    }

    _renderPlayer(props) {
      return (
        <video
          {...props}
          ref={this._videoRef}
          onPause={this._handlePause}
          onEnded={this._handleEnded}
          onCanPlayThrough={this._handleCanPlayThrough}
          onTimeUpdate={this._handleTimeUpdate}/>
      );
    }

    _toggleVideoPlayer() {
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

    _handlePlay() {
      this.setState({isPlaying: true});
    }

    _handlePause() {
      this.setState({isPlaying: false});
    }

    _handleEnded() {
      this.setState({isPlaying: false, currentTime: 0});
    }

    _handleCanPlayThrough() {
      const video = this._videoRef.current;

      if (!video) {
        return;
      }

      const totalTime = video.duration;
      const isPlaying = !!this.props.autoplay;

      this.setState({totalTime, isPlaying});
    }

    _handleTimeUpdate() {
      const video = this._videoRef.current;
      const {currentTime, totalTime} = this.state;

      if (!video) {
        return;
      }

      const SAMPLING_TIME = 0.3; // sec

      if (Math.abs(video.currentTime - currentTime) >= SAMPLING_TIME) {
        const progress = (totalTime > 0)
          ? (currentTime / totalTime) * 100 : 0;

        this.setState({currentTime: video.currentTime, progress});
      }
    }

    _handleFullScreen() {
      const video = this._videoRef.current;

      if (!video) {
        return;
      }

      if (!document.fullscreenElement) {
        video.requestFullscreen();
      }
    }

    _handleFullScreenExit() {
      const video = this._videoRef.current;

      if (video && document.fullscreenElement) {
        video.exitFullscreen();
      }
    }
  }

  WithVideoPlayer.propTypes = Component.propTypes;

  return WithVideoPlayer;
};

export const WithVideoPlayerPropTypes = {
  /** Рендер функция плейра */
  renderPlayer: PropTypes.func,
  /** Состояние плейра пауза/воспроизведение */
  isPlayerPlaying: PropTypes.bool,
  /** Прогресс воспроизведения, % */
  playerProgress: PropTypes.number,
  /** Общее время воспроизведения, сек */
  playerTotalTime: PropTypes.number,
  /** Текущее время воспроизведения, сек */
  playerTime: PropTypes.number,
  /** Обработчик события воспроизведения */
  onPlayerPlay: PropTypes.func,
  /** Обработчик события паузы воспроизведения */
  onPlayerPause: PropTypes.func,
  /** Перейти в полноэкранный режим */
  onPlayerFullScreen: PropTypes.func,
  /** Выйти из полноэкранного режима */
  onPlayerFullScreenExit: PropTypes.func,
};

export default withVideoPlayer;
