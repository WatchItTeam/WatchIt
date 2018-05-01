import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { getMovieInfo, getTVInfo } from "../api/APIUtils";
import ErrorMessage from "../components/ErrorMessage";
import DetailsPage from "../components/DetailsPage";
import "../css/Detailspage.scss";

class DetailspageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // from react-router
    currentMovie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func.isRequired,
  }
  state = {
    error: "",
    hasLoaded: false,
  }

  componentDidMount() {
    const { mediaType, id } = this.props.match.params;

    if (mediaType === "movie") {
      getMovieInfo(id)
        .then(this.processResponse)
        .catch((error) => {
          this.setState({ error: error.toString() });
        });
    } else if (mediaType === "tv") {
      getTVInfo(id)
        .then(this.processResponse)
        .catch((error) => {
          this.setState({ error: error.toString() });
        });
    } else {
      console.log("Invalid mediaType");
    }
  }

  processResponse = (currentMovie) => {
    if (!currentMovie) return;
    this.props.setCurrentMovie(currentMovie);
    this.setState({ hasLoaded: true });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <div className="no-poster3">
            <FontAwesomeIcon icon="image" />
          </div>
          <ErrorMessage>
            <div>{this.state.error}</div>
          </ErrorMessage>
        </div>
      );
    }
    if (!this.state.hasLoaded) {
      return null;
    }
    return (
      <DetailsPage currentMovie={this.props.currentMovie} />
    );
  }
}

export default DetailspageContainer;
