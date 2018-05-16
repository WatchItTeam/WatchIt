import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-regular/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import "../css/EpisodeMobileItem.scss";

// ({ episodeNumber, name, poster, checkClicked, watched })

class EpisodeMobileItem extends Component {
  state = { isOpen: false };

  render() {
    let mobileItem;
    let checkBox;
    const show = { id: 20 };

    if (this.props.watched) {
      checkBox = (
        <button className="episodeExpandBtn" onClick={() => this.props.addEpisode(show)}>
          <FontAwesomeIcon icon={CheckCircle} />
        </button>
      );
    } else {
      checkBox = (
        <button className="episodeExpandBtn" onClick={this.props.checkClicked}>
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
          <div className="episodeTitle">
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

};

export default EpisodeMobileItem;
