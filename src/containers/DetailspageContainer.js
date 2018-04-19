import React, { Component } from "react";
import PropTypes from "prop-types";
import { getMovieInfo } from "../api/APIUtils";
import ErrorMessage from "../components/ErrorMessage";
import DetailsPage from "../components/DetailsPage";

class DetailspageContainer extends Component {
  static propTypes = {
    currentMovie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func.isRequired,
  }
  state = {
    error: false,
    hasLoaded: false,
  }

  componentDidMount() {
    //if (this.props.currentMovie !== {}) return;

    getMovieInfo(this.props.match.params.id)
      .then((currentMovie) => {
        if (!currentMovie) return;
        this.props.setCurrentMovie(currentMovie);
        this.setState({ hasLoaded: true });
      }).catch(() => {
        this.setState({ error: true });
      });
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
