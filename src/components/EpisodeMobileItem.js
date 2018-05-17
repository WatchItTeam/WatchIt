import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-regular/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import "../css/EpisodeMobileItem.scss";

class EpisodeMobileItem extends Component {
  state = {
    isOpen: false,
    watched: false,
  };

  render() {
    let mobileItem;
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

    if (this.state.isOpen) {
      mobileItem = (
        <div className="expandedItemBox">
          <div className="expandedTitleBar">
            <div className="episodeNumber">
              {this.props.episodeNumber}
            </div>
            <div className="episodeTitleBox">
              {this.props.name}
            </div>
          </div>
          <div className="expandedDescriptionBox">
            {this.props.description}
          </div>
          <button className="expandBoxButton" onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
        </div>
      );
    } else {
      mobileItem = (
        <div className="episodeMobileItem">
          <div>
            <div className="episodeNumber">
              {this.props.episodeNumber}
            </div>
          </div>
          <div className="episodeMobileTitle">
            {this.props.name}
          </div>
          <button className="expandBoxButton" onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
          {checkBox}
        </div>
      );
    }

    return (
      <div>
        {mobileItem}
      </div>
    );
  }
}

EpisodeMobileItem.propTypes = {
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EpisodeMobileItem;
