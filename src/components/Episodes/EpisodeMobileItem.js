import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-solid/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import "../../css/EpisodeMobileItem.scss";

class EpisodeMobileItem extends Component {
  state = {
    isOpen: false,
    watched: false,
  }

  toggle() {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { toggle } = this;

    let mobileItem;
    let checkBox;
    const show = {
      id: this.props.showId,
      episodeNumber: this.props.episodeNumber,
    };

    if (this.state.watched) {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => this.setState({ watched: this.props.removeEpisode(show) })}
        >
          <FontAwesomeIcon icon={CheckCircle} />
        </button>
      );
    } else {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => this.setState({ watched: this.props.addEpisode(show) })}
        >
          <FontAwesomeIcon icon={Circle} />
        </button>
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
          <button className="expandBoxButton" onClick={toggle} />
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
          <button className="expandBoxButton" onClick={toggle} />
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
  episodeNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EpisodeMobileItem;
