import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import withVideoPlayer, {withVideoPlayerPropTypes} from "../../hocs/with-video-player";
import {formatPlayerTime} from "./player-utils";
import PlayButton from "./components/play-button";
import PauseButton from "./components/pause-button";
import FullScreenButton from "./components/full-screen-button";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
    this._handleExit = this._handleExit.bind(this);
  }

  render() {
    const {title, src, poster, isPlayerPlaying, playerProgress = 0, playerTime, playerTotalTime, renderPlayer, onPlayerPlay, onPlayerPause, onPlayerFullScreen} = this.props;

    const progress = playerProgress.toFixed(2);
    const elapsedTime = formatPlayerTime(
        playerTotalTime - playerTime, playerTotalTime
    );

    return (
      <div className="player">
        {renderPlayer({className: `player__video`, src, poster})}
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
                value={progress}
                max="100"/>
              <div
                className="player__toggler"
                style={{left: `${progress}%`}}>
                {`Toggler`}
              </div>
            </div>
            <div className="player__time-value">
              {elapsedTime}
            </div>
          </div>
          <div className="player__controls-row">
            {isPlayerPlaying ? (
              <PauseButton onClick={onPlayerPause}/>
            ) : (
              <PlayButton onClick={onPlayerPlay}/>
            )}
            <div className="player__name">
              {title}
            </div>
            <FullScreenButton onClick={onPlayerFullScreen}/>
          </div>
        </div>
      </div>
    );
  }

  _handleExit() {
    const {onPlayerFullScreenExit, onPlayerStop, onExit} = this.props;

    onPlayerStop();
    onPlayerFullScreenExit();

    if (onExit) {
      onExit();
    }
  }
}

VideoPlayer.defaultProps = {
  renderPlayer: () => null,
  autoplay: false,
};
VideoPlayer.propTypes = {
  /** Пропсы withVideoPlayer HOC */
  ...withVideoPlayerPropTypes,
  /** Указывает путь к воспроизводимому видеоролику */
  src: PropTypes.string,
  /** Описание воспроизводимого видеоролика */
  title: PropTypes.string,
  /** Указывает адрес картинки, которая будет отображаться, пока видео не доступно или не воспроизводится */
  poster: PropTypes.string,
  /** Обработчик события выхода */
  onExit: PropTypes.func,
};

export {VideoPlayer};
export default withVideoPlayer()(VideoPlayer);
