import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { addToList } from "../Firebase/lists";
import { successToast, errorToast } from "../utils/toast";
import { withUser } from "../Firebase/UserContext";
import { normalizeMovie } from "../api/APIUtils";
import parseName from "../utils/parseName";
import PrimaryButton from "../components/PrimaryButton";
import ListPickerModal from "../components/ListPickerModal";

class AddToListBtn extends Component {
  static propTypes = {
    currentMovie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
    modalIsOpen: false,
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  }

  hideModal = () => {
    this.setState({ modalIsOpen: false });
  }

  onModalSubmit = async (selectedList) => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.props;
    const movie = normalizeMovie(currentMovie);
    try {
      await addToList(movie, selectedList);
      successToast(`Added ${movie.title} to ${parseName(selectedList)}`);
    } catch (error) {
      errorToast(`Something went wrong when adding ${movie.title}`);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, modalIsOpen } = this.state;
    const { user } = this.props;
    const { onModalSubmit, hideModal, showModal } = this;

    const label = isLoading ? "Adding..." : "+ Add to";
    const disabled = isLoading || user.status !== "signedIn";

    return (
      <Fragment>
        <PrimaryButton onClick={showModal} disabled={disabled}>
          {label}
        </PrimaryButton>
        <ListPickerModal isOpen={modalIsOpen} hideFunc={hideModal} onSubmit={onModalSubmit} />
      </Fragment>
    );
  }
}

export default withUser(AddToListBtn);
