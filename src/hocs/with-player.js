import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withPlayer = (options = {}) => (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._renderPlayer = this._renderPlayer.bind(this);
      this._handlePlay = this._handlePlay.bind(this);
      this._handlePause = this._handlePause.bind(this);

      this._play = this._play.bind(this);
      this._stop = this._stop.bind(this);
      this._timeout = null;

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: false,
      };
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.isPlaying !== prevState.isPlaying) {
        if (this.state.isPlaying) {
          this._play();
        } else {
          this._stop();
        }
      }
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={this._renderPlayer}
        isPlayerPlaying={this.state.isPlaying}
        onPlayerPlay={this._handlePlay}
        onPlayerPause={this._handlePause}/>;
    }

    componentWillUnmount() {
      this._resetTimeout();
    }

    _renderPlayer(props) {
      return (
        <video
          width={280}
          height={175}
          {...props}
          preload="none"
          ref={this._videoRef}/>
      );
    }

    _handlePlay() {
      const timeout =
        this.props.autoPlayTimeout ||
        options.autoPlayTimeout;

      if ((typeof timeout === `number`) && (timeout > 0)) {
        this._resetTimeout();

        this._timeout = setTimeout(() => {
          if (this._timeout) {
            this.setState({isPlaying: true});
          }
        }, timeout);
      } else {
        this.setState({isPlaying: true});
      }
    }

    _handlePause() {
      this._resetTimeout();
      this.setState({isPlaying: false});
    }

    _resetTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    _play() {
      const video = this._videoRef.current;
      if (video) {
        video.play();
      }
    }

    _stop() {
      const video = this._videoRef.current;
      if (video) {
        video.load();
      }
    }
  }

  WithPlayer.propTypes = Component.propTypes;

  return WithPlayer;
};

export const withPlayerPropTypes = {
  /** Рендер плейра */
  renderPlayer: PropTypes.func,
  /** Таймаут автовоспроизведения трейлера фильма, мс */
  autoPlayTimeout: PropTypes.number,
  /** Состояние плейра пауза/воспроизведение */
  isPlayerPlaying: PropTypes.bool,
  /** Обработчик события воспроизведения */
  onPlayerPlay: PropTypes.func,
  /** Обработчик события паузы воспроизведения */
  onPlayerPause: PropTypes.func,
};

export default withPlayer;
