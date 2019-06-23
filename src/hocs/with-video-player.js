import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withVideoPlayer = (options = {}) => (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._play = this._play.bind(this);
      this._pause = this._pause.bind(this);
      this._stop = this._stop.bind(this);

      this._renderPlayer = this._renderPlayer.bind(this);
      this._handlePlayerPlay = this._handlePlayerPlay.bind(this);

      this._handlePlay = this._handlePlay.bind(this);
      this._handlePause = this._handlePause.bind(this);
      this._handleEnded = this._handleEnded.bind(this);
      this._handleLoadStart = this._handleLoadStart.bind(this);
      this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);

      this._handlePlayError = this._handlePlayError.bind(this);

      this._handleFullScreen = this._handleFullScreen.bind(this);
      this._handleFullScreenExit = this._handleFullScreenExit.bind(this);

      this._timeout = null;
      this._isMounted = true;

      this._videoRef = React.createRef();

      this.initialState = {
        /** Воспроизведение/пауза */
        isPlaying: false,
        /** Общее время воспроизведения, сек */
        totalTime: 0,
        /** Текущее время воспроизведения, сек */
        currentTime: 0,
        /** Прогресс воспроизведения, % */
        progress: 0,
      };
      this.state = this.initialState;
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
        onPlayerPlay={this._handlePlayerPlay}
        onPlayerPause={this._pause}
        onPlayerStop={this._stop}
        onPlayerFullScreen={this._handleFullScreen}
        onPlayerFullScreenExit={this._handleFullScreenExit}/>;
    }

    componentWillUnmount() {
      this._resetTimeout();
      this._isMounted = false;
    }

    _renderPlayer(props) {
      return (
        <video
          {...props}
          ref={this._videoRef}
          onPause={this._handlePause}
          onEnded={this._handleEnded}
          onAbort={this._handleAbort}
          onLoadStart={this._handleLoadStart}
          onCanPlayThrough={this._handleCanPlayThrough}
          onTimeUpdate={this._handleTimeUpdate}/>
      );
    }

    _play() {
      return new Promise((resolve, reject) => {
        const video = this._videoRef.current;

        if (!video) {
          reject(`Reference to video is not defined`);
        }

        resolve(
            video.play()
              .then(this._handlePlay)
              .catch(this._handlePlayError)
        );
      });
    }

    _pause() {
      const video = this._videoRef.current;

      if (video) {
        video.pause();
        this._handlePause();
      }
    }

    _stop() {
      const video = this._videoRef.current;

      if (video) {
        video.load();
        this._handlePause();
      }
    }

    _resetTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    _handlePlayerPlay() {
      const {autoPlayTimeout} = this.props;
      const timeout = autoPlayTimeout || options.autoPlayTimeout;

      if ((typeof timeout === `number`) && (timeout > 0)) {
        this._resetTimeout();

        return new Promise((resolve) => {
          this._timeout = setTimeout(() => {
            if (this._timeout) {
              resolve(this._play());
            }
          }, timeout);
        });
      }
      return this._play();
    }

    _handlePlay() {
      this._resetTimeout();
      if (this._isMounted) {
        this.setState({isPlaying: true});
      }
    }

    _handlePause() {
      this._resetTimeout();
      this.setState({isPlaying: false});
    }

    _handleEnded() {
      this._resetTimeout();
      this.setState({isPlaying: false, currentTime: 0, progress: 0});
    }

    _handlePlayError() {
      if (this._isMounted) {
        this.setState({...this.initialState});
      }
    }

    _handleLoadStart() {
      this.setState({...this.initialState});
    }

    _handleCanPlayThrough() {
      const video = this._videoRef.current;
      const totalTime = (video && video.duration) || 0;

      this.setState({totalTime});

      if (this.props.autoplay) {
        this._play();
      }
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

      if (video && !document.fullscreenElement) {
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

  WithVideoPlayer.propTypes = {
    ...Component.propTypes,
    /** Автовоспроизведение видеоролика */
    autoplay: PropTypes.bool,
  };

  return WithVideoPlayer;
};

export const withVideoPlayerPropTypes = {
  /** Рендер функция плейра */
  renderPlayer: PropTypes.func,
  /** Таймаут автовоспроизведения трейлера фильма, мс */
  autoPlayTimeout: PropTypes.number,
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
