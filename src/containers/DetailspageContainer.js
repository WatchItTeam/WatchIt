import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { getMovieInfo, getTVInfo } from "../api/APIUtils";
import ErrorMessage from "../components/ErrorMessage";
import DetailsPage from "../components/DetailsPage";
import "../css/Detailspage.scss";

class DetailspageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired, // from react-router
    currentMovie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func.isRequired,
  }
  state = {
    error: "",
    hasLoaded: false,
  }

  componentDidMount() {
    this.getDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getDetails();
    }
  }

  getDetails() {
    const { mediaType, id } = this.props.match.params;
    this.setState({ hasLoaded: false });

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
      return <div style={{ marginTop: "100px" }} className="container">Loading...</div>;
    }
    return (
      <DetailsPage currentMovie={this.props.currentMovie} />
    );
  }
}

export default DetailspageContainer;
