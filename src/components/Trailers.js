import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../css/Scroll.scss";

class Trailers extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      source: null,
    };
  }

  updateTrailer = () => {
    if (this.props.trailers.length === 0) {
      this.setState({ source: null });
      return;
    }
    this.setState({ source: `https://www.youtube.com/embed/${this.props.trailers[this.index].key}` });
  }

  componentDidMount = () => {
    this.updateTrailer();
  }

  scrollRight = () => {
    this.index = (this.index + 1) % this.props.trailers.length;
    this.updateTrailer();
  }

  scrollLeft = () => {
    this.index = this.index === 0 ? (this.index - 1) +
    this.props.trailers.length : this.index - 1;
    this.updateTrailer();
  }

  render() {
    if (this.props.trailers.length === 0) {
      return <div>No trailers to show</div>;
    } else if (this.props.trailers.length === 1) {
      return (
        <div className="OuterDiv">
          <div className="embed-container">
            <iframe src={this.state.source} frameBorder="0" title={this.state.currentTrailer} allowFullScreen />
          </div>
        </div>
      );
    }
    return (
      <div className="OuterDiv">
        <button className="leftbutton scroll-button"><FontAwesomeIcon icon="angle-left" onClick={this.scrollLeft} /></button>
        <div className="embed-container">
          <iframe src={this.state.source} frameBorder="0" title={this.state.currentTrailer} allowFullScreen />
        </div>
        <button className="rightbutton scroll-button"><FontAwesomeIcon icon="angle-right" onClick={this.scrollRight} /></button>
      </div>
    );
  }
}

export default Trailers;
