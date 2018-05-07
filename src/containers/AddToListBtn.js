import React, { Component } from "react";
import PropTypes from "prop-types";
import { addToList } from "../Firebase/lists";
import { successToast, errorToast } from "../utils/toast";
import { withUser } from "../Firebase/UserContext";
import PrimaryButton from "../components/PrimaryButton";

class AddToListBtn extends Component {
  static propTypes = {
    currentMovie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  state = { isLoading: false }

  onClick = async () => {
    this.setState({ isLoading: true });
    const { currentMovie } = this.props;
    try {
      await addToList(currentMovie);
      successToast(`Added ${currentMovie.title} to Watching`);
    } catch (error) {
      errorToast(`Something went wrong when adding ${currentMovie.title}`);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    const { user } = this.props;
    const label = isLoading ? "Adding..." : "+ Add to";
    const disabled = isLoading || user.status !== "signedIn";
    return (
      <PrimaryButton onClick={this.onClick} disabled={disabled}>
        {label}
      </PrimaryButton>
    );
  }
}

export default withUser(AddToListBtn);
