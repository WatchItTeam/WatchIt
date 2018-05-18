import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { getPersonDetails } from "../api/APIUtils";
import ActorPage from "../components/ActorPage";
import ErrorMessage from "../components/ErrorMessage";
import "../css/Detailspage.scss";

class ActorPageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired, // from react-router
    currentActor: PropTypes.object.isRequired,
    setCurrentActor: PropTypes.func.isRequired,
  }
  state = {
    error: "",
    hasLoaded: false,
  }

  componentDidMount() {
    if (this.props.currentActor && this.props.currentActor.id !== this.props.match.params.id) {
      this.getDetails();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getDetails();
    }
  }

  getDetails() {
    const { id } = this.props.match.params;
    this.setState({ hasLoaded: false });
    getPersonDetails(id)
      .then(this.processResponse)
      .catch((error) => {
        this.setState({ error: error.toString() });
      });
  }

  processResponse = (personDetails) => {
    if (!personDetails) return;
    this.props.setCurrentActor(personDetails);
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
      <ActorPage currentActor={this.props.currentActor} />
    );
  }
}

export default ActorPageContainer;
