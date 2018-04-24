import React, { Component } from "react";
import PropTypes from "prop-types";
import { getMovieInfo, getTVInfo } from "../api/APIUtils";
import ErrorMessage from "../components/ErrorMessage";
import DetailsPage from "../components/DetailsPage";

class DetailspageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // from react-router
    currentMovie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func.isRequired,
  }
  state = {
    error: false,
    hasLoaded: false,
  }

  componentDidMount() {
    const { mediaType, id } = this.props.match.params;

    if (mediaType === "movie") {
      getMovieInfo(id)
        .then(this.processResponse)
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (mediaType === "tv") {
      getTVInfo(id)
        .then(this.processResponse)
        .catch(() => {
          this.setState({ error: true });
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
        <ErrorMessage>Oops! Could not load detailspage :(</ErrorMessage>
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
