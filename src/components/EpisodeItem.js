import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-regular/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import ImageWithFallback from "./ImageWithFallback";
import "../css/EpisodeItem.scss";

class EpisodeItem extends Component {
  state = { watched: false };

  render() {
    let checkBox;
    const show = {
      id: this.props.showId,
      episode: this.props.episodeId,
    };

    if (this.state.watched) {
      checkBox = (
        <button
          className="episodeCheckbox"
          onClick={() => this.setState({ watched: this.props.removeEpisode(show) })}
        >
          <FontAwesomeIcon icon={CheckCircle} />
        </button>
      );
    } else {
      checkBox = (
        <button
          className="episodeCheckbox"
          onClick={() => this.setState({ watched: this.props.addEpisode(show) })}
        >
          <FontAwesomeIcon icon={Circle} />
        </button >
      );
    }

    return (
      <div className="episodeItem">
        <div className="episodeTitleWrapper">
          <ImageWithFallback
            src={this.props.poster}
            imgSize="original"
            mediaType="tv"
            alt={`Poster for ${this.props.name}`}
            className="episodePic"
          />
          <div className="episodeTextBox">
            <div className="episodeTitle">
              {this.props.episodeNumber}
              &nbsp;
              {this.props.name}
            </div>
            <div className="episodeTextContent">
              {this.props.description}
            </div>
          </div>
        </div>
        {checkBox}
      </div>
    );
  }
}

EpisodeItem.propTypes = {
  episodeNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.number.isRequired,
};

export default EpisodeItem;
